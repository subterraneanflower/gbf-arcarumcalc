import * as React from 'react';
import { useCallback, useContext, useState, useMemo, useEffect } from 'react';
import { Button } from '../components/Button';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { GbfArcarumProgress } from '../lib/gbf';
import { estimateArcarum } from '../lib/estimate';
import { ArcarumContext } from '../context/arcarum_context';
import { evoker } from '../data/arcarum';
import { AppContext } from '../context/app_context';
import { generateShareImageFile } from '../lib/image';

declare let gtag: any;

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const resultStyle: React.CSSProperties = {
  marginBottom: '2em'
};

const pStyle: React.CSSProperties = {
  fontSize: '0.8em',
  textAlign: 'center'
};

const daysStyle: React.CSSProperties = {
  fontSize: '3em',
  textAlign: 'center'
};

const buttonContainerStyle: React.CSSProperties = {
  fontSize: '0.8em',
  margin: '1em 0',
  textAlign: 'center'
};

const installButtonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  fontSize: '0.8em',
  margin: '3em 0'
};

const disabledButtonStyle: React.CSSProperties = {
  opacity: 0.3
};

const tweetButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--twitter-blue)',
  width: '12em'
};

const shareButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--twitter-blue)',
  width: '12em'
};

const backToTopButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '12em'
};

const installButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '12em',
  margin: '0.3em 0'
};

const installMessageStyle: React.CSSProperties = {
  textAlign: 'center'
};

const viewSourceOnGitHubContainerStyle: React.CSSProperties = {
  margin: '2em 0',
  textAlign: 'center'
};

const viewSouceOnGitHubStyle: React.CSSProperties = {
  color: 'white'
};

export const ResultPage = withRouter((props) => {
  const { installPrompt, setInstallPrompt } = useContext(AppContext);
  const arcarumContext = useContext(ArcarumContext);

  const [count, setCount] = useState<number>(0);
  const [generatedImageFile, setGeneratedImageFile] = useState<File>();

  const backToTop = useCallback(() => {
    if (confirm('最初のページに戻りますか？')) {
      arcarumContext.setInventory({ sephiraStone: 0, astra: 0, idean: 0, fragment: 0, arcarumPoint: 0 });
      props.history.push('/');
    }
  }, [props.history]);

  const install = useCallback(() => {
    if (!installPrompt) {
      return;
    }

    installPrompt.prompt();

    installPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        gtag('event', 'Add to Homescreen', { event_category: 'App', event_label: 'GBF Arcarum Calc' });
      }

      setInstallPrompt(null);
    });
  }, [installPrompt, setInstallPrompt]);

  const progress: GbfArcarumProgress = useMemo(
    () => ({
      targetEvoker: arcarumContext.targetEvoker || evoker.fraux,
      summonLevel: arcarumContext.summonLevel,
      unusedTickets: arcarumContext.unusedTickets,
      inventory: arcarumContext.inventory,
      additionalTicketInfo: arcarumContext.additionalTicketInfo,
      renewalEventInterval: arcarumContext.renewalEventInterval
    }),
    [
      arcarumContext.targetEvoker,
      arcarumContext.summonLevel,
      arcarumContext.unusedTickets,
      arcarumContext.inventory,
      arcarumContext.additionalTicketInfo,
      arcarumContext.renewalEventInterval
    ]
  );

  const estimate = useMemo(() => estimateArcarum(progress), [progress]);

  useEffect(() => {
    if (count <= estimate.days) {
      setTimeout(() => setCount(Math.min(count + 1, estimate.days)), 8);
    }
  }, [count, setCount]);

  useEffect(() => {
    generateShareImageFile({ evoker: progress.targetEvoker, days: estimate.days }).then((file) =>
      setGeneratedImageFile(file)
    );
  }, [setGeneratedImageFile]);

  const tweet = useCallback(() => {
    const text = encodeURIComponent(
      `あなたが「${progress.targetEvoker.name.ja}」を取得するまでにかかる日数は……\n約${estimate.days}日\nです！ #グラブル十賢者皮算用ツール\nhttps://sbfl.net/app/granbluefantasy/arcarumcalc/`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }, [estimate]);

  const shareWithImage = useCallback(async () => {
    (navigator as any).share({
      files: [generatedImageFile],
      text: `あなたが「${progress.targetEvoker.name.ja}」を取得するまでにかかる日数は……\n約${estimate.days}日\nです！ #グラブル十賢者皮算用ツール\nhttps://sbfl.net/app/granbluefantasy/arcarumcalc/`
    });
  }, [generatedImageFile, estimate]);

  return (
    <Page>
      <h2 style={pageTitleStyle}>結果</h2>
      <div style={resultStyle}>
        <p style={pStyle}>
          あなたが{arcarumContext.targetEvoker ? arcarumContext.targetEvoker.name.ja : ''}を入手するまで
        </p>
        <p style={daysStyle}>約{count}日</p>
        <p style={pStyle}>です</p>
      </div>
      <div style={buttonContainerStyle}>
        <Button style={tweetButtonStyle} onClick={tweet}>
          ツイートする
        </Button>
      </div>
      {'share' in navigator && (navigator as any).canShare?.({ files: [new File([''], 'test.png')] }) ? (
        <div style={buttonContainerStyle}>
          <Button
            style={generatedImageFile ? shareButtonStyle : { ...shareButtonStyle, ...disabledButtonStyle }}
            onClick={generatedImageFile ? shareWithImage : undefined}
            disabled={!generatedImageFile}
          >
            画像でシェア
          </Button>
        </div>
      ) : null}
      <div style={buttonContainerStyle}>
        <Button style={backToTopButtonStyle} onClick={backToTop}>
          はじめから
        </Button>
      </div>
      {installPrompt ? (
        <div style={installButtonContainerStyle}>
          <div style={installMessageStyle}>
            このツールをアプリとして
            <br />
            インストールすることができます
          </div>
          <Button style={installButtonStyle} onClick={install}>
            インストール
          </Button>
        </div>
      ) : null}
      <div style={viewSourceOnGitHubContainerStyle}>
        <a style={viewSouceOnGitHubStyle} href="https://github.com/subterraneanflower/gbf-arcarumcalc" target="_blank">
          View Source on GitHub
        </a>
      </div>
    </Page>
  );
});
