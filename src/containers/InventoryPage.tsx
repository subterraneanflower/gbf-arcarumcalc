import * as React from 'react';
import { useCallback, useContext, useRef } from 'react';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { ArcarumContext } from '../context/arcarum_context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';

const pageTitleStyle: React.CSSProperties = {
  fontWeight: 'normal',
  marginBottom: '1em',
  textAlign: 'center'
};

const inputContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
};

const inputItemStyle: React.CSSProperties = {
  margin: '0.8em 0'
};

const labelStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '7em'
};

const numInputStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '6em'
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: '2em',
  textAlign: 'center'
};

const buttonStyle: React.CSSProperties = {
  padding: '0.3em 3em'
};

export const InventoryPage = withRouter(props => {
  const arcarumContext = useContext(ArcarumContext);

  const sephiraInputRef = useRef<HTMLInputElement>(null);
  const astraInputRef = useRef<HTMLInputElement>(null);
  const ideanInputRef = useRef<HTMLInputElement>(null);
  const fragmentInputRef = useRef<HTMLInputElement>(null);
  const pointInputRef = useRef<HTMLInputElement>(null);

  const onClickNext = useCallback(() => {
    let sephiraStone = 0;
    let astra = 0;
    let idean = 0;
    let fragment = 0;
    let point = 0;

    if (sephiraInputRef.current) {
      sephiraStone = parseInt(sephiraInputRef.current.value) || 0;
    }

    if (astraInputRef.current) {
      astra = parseInt(astraInputRef.current.value) || 0;
    }

    if (ideanInputRef.current) {
      idean = parseInt(ideanInputRef.current.value) || 0;
    }

    if (fragmentInputRef.current) {
      fragment = parseInt(fragmentInputRef.current.value) || 0;
    }

    if (pointInputRef.current) {
      point = parseInt(pointInputRef.current.value) || 0;
    }

    arcarumContext.setInventory({
      sephiraStone,
      astra,
      idean,
      fragment,
      arcarumPoint: point
    });

    props.history.push('/event');
  }, [props.history]);

  return (
    <Page enableBackButton>
      <h2 style={pageTitleStyle}>アイテム所持数</h2>
      <div style={inputContainerStyle}>
        <div style={inputItemStyle}>
          <label style={labelStyle}>セフィラ石</label>
          <Input
            style={numInputStyle}
            type="number"
            pattern="\d*"
            min={0}
            defaultValue={arcarumContext.inventory.sephiraStone}
            ref={sephiraInputRef}
          />
        </div>

        <div style={inputItemStyle}>
          <label style={labelStyle}>アストラ</label>
          <Input
            style={numInputStyle}
            type="number"
            pattern="\d*"
            min={0}
            defaultValue={arcarumContext.inventory.astra}
            ref={astraInputRef}
          />
        </div>

        <div style={inputItemStyle}>
          <label style={labelStyle}>イデア</label>
          <Input
            style={numInputStyle}
            type="number"
            pattern="\d*"
            min={0}
            defaultValue={arcarumContext.inventory.idean}
            ref={ideanInputRef}
          />
        </div>

        <div style={inputItemStyle}>
          <label style={labelStyle}>フラグメント</label>
          <Input
            style={numInputStyle}
            type="number"
            pattern="\d*"
            min={0}
            defaultValue={arcarumContext.inventory.fragment}
            ref={fragmentInputRef}
          />
        </div>

        <div style={inputItemStyle}>
          <label style={labelStyle}>ポイント</label>
          <Input
            style={numInputStyle}
            type="number"
            pattern="\d*"
            min={0}
            defaultValue={arcarumContext.inventory.arcarumPoint}
            ref={pointInputRef}
          />
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Button style={buttonStyle} onClick={onClickNext}>
          次へ
        </Button>
      </div>
    </Page>
  );
});
