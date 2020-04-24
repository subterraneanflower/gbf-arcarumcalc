import * as React from 'react';
import { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { ArcarumContext } from '../context/arcarum_context';
import { Button } from '../components/Button';

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const summonButtonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
};

const summonButtonStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8em',
  margin: '1em 0',
  width: '49%'
};

const srSummonButtonStyle: React.CSSProperties = {
  ...summonButtonStyle,
  backgroundColor: 'var(--sr-silver)'
};

const ssrSummonButtonStyle: React.CSSProperties = {
  ...summonButtonStyle,
  backgroundColor: 'var(--ssr-gold)'
};

interface SummonLevel {
  label: string;
  level: number;
  buttonStyle: React.CSSProperties;
}

const summonLevels: SummonLevel[] = [
  { label: '未所持', level: 0, buttonStyle: srSummonButtonStyle },
  { label: 'SR無凸', level: 1, buttonStyle: srSummonButtonStyle },
  { label: 'SR1凸', level: 2, buttonStyle: srSummonButtonStyle },
  { label: 'SR2凸', level: 3, buttonStyle: srSummonButtonStyle },
  { label: 'SR3凸', level: 4, buttonStyle: srSummonButtonStyle },
  { label: 'SSR3凸', level: 5, buttonStyle: ssrSummonButtonStyle },
  { label: 'SSR4凸', level: 6, buttonStyle: ssrSummonButtonStyle },
  { label: 'SSR5凸', level: 7, buttonStyle: ssrSummonButtonStyle }
];

export const SummonSelectPage = withRouter((props) => {
  const arcarumContext = useContext(ArcarumContext);

  const summonButtons = summonLevels.map((summon) => {
    const onClickSummon = () => {
      arcarumContext.setSummonLevel(summon.level);
      props.history.push('/inventory');
    };

    return (
      <Button key={`level-${summon.level}`} style={summon.buttonStyle} onClick={onClickSummon}>
        {summon.label}
      </Button>
    );
  });

  const summonName = arcarumContext.targetEvoker ? arcarumContext.targetEvoker.arcarumSummon.name.ja : '';

  return (
    <Page enableBackButton>
      <h2 style={pageTitleStyle}>
        <div>「{summonName}」</div>
        <div>取得状況</div>
      </h2>
      <div style={summonButtonContainerStyle}>{summonButtons}</div>
    </Page>
  );
});
