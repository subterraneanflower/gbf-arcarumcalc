import * as React from 'react';
import { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { SelectButton } from '../components/SelectButton';
import { ArcarumContext } from '../context/arcarum_context';

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const summonButtonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap'
};

const summonButtonStyle: React.CSSProperties = {
  margin: '1em auto',
  width: '45%'
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

export const SummonSelectPage = withRouter(props => {
  const arcarumContext = useContext(ArcarumContext);

  const summonButtons = summonLevels.map(summon => {
    const onClickSummon = () => {
      arcarumContext.setSummonLevel(summon.level);
      props.history.push('/inventory');
    };

    return (
      <SelectButton key={`level-${summon.level}`} style={summon.buttonStyle} onClick={onClickSummon}>
        {summon.label}
      </SelectButton>
    );
  });

  const summonName = arcarumContext.targetEvoker ? arcarumContext.targetEvoker.arcarumSummon.name.ja : '';

  return (
    <Page enableBackButton>
      <h2 style={pageTitleStyle}>「{summonName}」取得状況</h2>
      <div style={summonButtonContainerStyle}>{summonButtons}</div>
    </Page>
  );
});
