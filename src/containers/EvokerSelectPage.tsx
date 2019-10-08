import * as React from 'react';
import { useCallback, useContext } from 'react';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { evokers, elementToCssColor } from '../data/arcarum';
import { ArcarumContext } from '../context/arcarum_context';
import { Button } from '../components/Button';

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const evokerButtonContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
};

const evokerButtonStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.8em',
  paddingLeft: '0',
  paddingRight: '0',
  margin: '1em 0',
  width: '49%'
};

export const EvokerSelectPage = withRouter(props => {
  const arcarumContext = useContext(ArcarumContext);

  // 各キャラのボタンを作る
  const evokerButtons = evokers.map(ev => {
    // クリック時の挙動
    const onClickCharacter = () => {
      arcarumContext.setTargetEvoker(ev);
      props.history.push('/summon');
    };

    const buttonStyle = { ...evokerButtonStyle, backgroundColor: elementToCssColor[ev.arcarumSummon.element] };

    return (
      <Button key={ev.slug} style={buttonStyle} data-character={ev.slug} onClick={onClickCharacter}>
        {ev.name.ja}
      </Button>
    );
  });

  return (
    <Page enableBackButton>
      <h2 style={pageTitleStyle}>取得したい賢者</h2>
      <div style={evokerButtonContainerStyle}>{evokerButtons}</div>
    </Page>
  );
});
