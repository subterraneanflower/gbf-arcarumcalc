import * as React from 'react';
import { useCallback } from 'react';
import { Page } from '../components/Page';
import { Button } from '../components/Button';
import { withRouter } from 'react-router';

const titlePageStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around'
};

const logoContainerStyle: React.CSSProperties = {
  marginBottom: '2em'
};

const logoImgStyle: React.CSSProperties = {
  display: 'block',
  maxWidth: '100%',
  margin: '0 auto'
};

const logoTitleStyle: React.CSSProperties = {
  fontSize: '1.5em',
  fontWeight: 'normal',
  textAlign: 'center'
};

const buttonContainerStyle: React.CSSProperties = {
  textAlign: 'center'
};

const issueLinkContainerStyle: React.CSSProperties = {
  margin: '2em 0',
  textAlign: 'center'
};

const issueLinkStyle: React.CSSProperties = {
  color: 'white'
};

export const TitlePage = withRouter((props) => {
  const gotoCalc = useCallback(() => {
    props.history.push('/evoker');
  }, [props.history]);

  return (
    <Page style={titlePageStyle}>
      <div style={logoContainerStyle}>
        <img style={logoImgStyle} src="img/logo.svg" />
        <h1 style={logoTitleStyle}>十賢者皮算用ツール</h1>
      </div>

      <div style={buttonContainerStyle}>
        <Button onClick={gotoCalc}>はじめる</Button>
      </div>

      <div style={issueLinkContainerStyle}>
        <a style={issueLinkStyle} href="https://github.com/subterraneanflower/gbf-arcarumcalc/issues" target="_blank">
          既知の不具合
        </a>
      </div>
    </Page>
  );
});
