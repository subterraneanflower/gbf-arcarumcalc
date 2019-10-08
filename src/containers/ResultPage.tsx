import * as React from 'react';
import { useCallback, useContext, useState, useMemo, useEffect } from 'react';
import { Button } from '../components/Button';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { GbfArcarumProgress } from '../lib/gbf';
import { estimateArcarum } from '../lib/estimate';
import { ArcarumContext } from '../context/arcarum_context';
import { evoker } from '../data/arcarum';

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const resultStyle: React.CSSProperties = {
  marginBottom: '3em'
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
  margin: '1em 0',
  textAlign: 'center'
};

const tweetButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  backgroundColor: 'var(--twitter-blue)',
  width: '12em'
};

const backToTopButtonStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '12em'
};

export const ResultPage = withRouter(props => {
  const arcarumContext = useContext(ArcarumContext);

  const [count, setCount] = useState<number>(0);

  const backToTop = useCallback(() => {
    if (confirm('最初のページに戻りますか？')) {
      arcarumContext.setInventory({ sephiraStone: 0, astra: 0, idean: 0, fragment: 0, arcarumPoint: 0 });
      props.history.push('/');
    }
  }, [props.history]);

  const progress: GbfArcarumProgress = useMemo(
    () => ({
      targetEvoker: arcarumContext.targetEvoker || evoker.fraux,
      summonLevel: arcarumContext.summonLevel,
      inventory: arcarumContext.inventory,
      additionalTicketInfo: arcarumContext.additionalTicketInfo,
      renewalEventInterval: arcarumContext.renewalEventInterval
    }),
    [
      arcarumContext.targetEvoker,
      arcarumContext.summonLevel,
      arcarumContext.inventory,
      arcarumContext.additionalTicketInfo,
      arcarumContext.renewalEventInterval
    ]
  );

  const estimate = useMemo(() => estimateArcarum(progress), [progress]);

  useEffect(() => {
    setTimeout(() => setCount(Math.min(count + 1, estimate.days)), 8);
  }, [count, setCount]);

  const tweet = useCallback(() => {
    const text = encodeURIComponent(
      `あなたが「${progress.targetEvoker.name.ja}」を取得するまでにかかる日数は……\n約${estimate.days}日\nです！\nhttps://sbfl.net/app/granbluefantasy/arcarumcalc/`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  }, [estimate]);

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
      <div style={buttonContainerStyle}>
        <Button style={backToTopButtonStyle} onClick={backToTop}>
          はじめから
        </Button>
      </div>
    </Page>
  );
});
