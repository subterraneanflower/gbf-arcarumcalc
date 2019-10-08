import * as React from 'react';
import { useState, useCallback, useContext, useRef } from 'react';
import { withRouter } from 'react-router';
import { Page } from '../components/Page';
import { ArcarumContext, AdditionalTicketStartAt, RenewalEventInterval } from '../context/arcarum_context';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';

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
  margin: '1em 0'
};

const inputGroupStyle: React.CSSProperties = {
  textAlign: 'center',
  padding: '0.8em 0'
};

const labelStyle: React.CSSProperties = {
  display: 'block',
  textAlign: 'center'
};

const numInputStyle: React.CSSProperties = {
  display: 'inline-block',
  width: '6em',
  marginLeft: '0.8em'
};

const buttonContainerStyle: React.CSSProperties = {
  marginTop: '2em',
  textAlign: 'center'
};

const buttonStyle: React.CSSProperties = {
  padding: '0.3em 3em'
};

export const EventPage = withRouter(props => {
  const arcarumContext = useContext(ArcarumContext);

  const [showsTicketInput, setShowsTicketInput] = useState<boolean>(
    arcarumContext.additionalTicketInfo ? arcarumContext.additionalTicketInfo.startAt !== 'none' : false
  );

  const additionalTicketStartRef = useRef<HTMLSelectElement>(null);
  const additionalTicketInputRef = useRef<HTMLInputElement>(null);
  const renewalEventSelectRef = useRef<HTMLSelectElement>(null);

  const onChangeAdditionalTicketStartAt = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setShowsTicketInput(event.currentTarget.value !== 'none');
    },
    [setShowsTicketInput]
  );

  const onClickNext = useCallback(() => {
    let additionalTicketStartAt: AdditionalTicketStartAt = 'none';
    let additionalTickets = 0;
    let renewalEventInterval: RenewalEventInterval = 'none';

    if (additionalTicketStartRef.current) {
      additionalTicketStartAt = additionalTicketStartRef.current.value as AdditionalTicketStartAt;
    }

    if (additionalTicketInputRef.current) {
      additionalTickets = parseInt(additionalTicketInputRef.current.value) || 0;
    }

    if (renewalEventSelectRef.current) {
      renewalEventInterval = renewalEventSelectRef.current.value as RenewalEventInterval;
    }

    if (additionalTicketStartAt !== 'none') {
      arcarumContext.setAdditionalTicketInfo({
        startAt: additionalTicketStartAt,
        days: additionalTickets
      });
    }

    arcarumContext.setRenewalEventInterval(renewalEventInterval);

    props.history.push('/result');
  }, [props.history]);

  return (
    <Page enableBackButton>
      <h2 style={pageTitleStyle}>イベント情報</h2>
      <div style={inputContainerStyle}>
        <div style={inputItemStyle}>
          <label style={labelStyle}>チケット追加発行</label>
          <div style={inputGroupStyle}>
            <Select
              defaultValue={arcarumContext.additionalTicketInfo ? arcarumContext.additionalTicketInfo.startAt : 'none'}
              onChange={onChangeAdditionalTicketStartAt}
              ref={additionalTicketStartRef}
            >
              <option value="none">なし</option>
              <option value="unknown">そのうち</option>
              <option value="today">今日から</option>
            </Select>

            {showsTicketInput ? (
              <>
                <Input
                  style={numInputStyle}
                  type="number"
                  pattern="\d+"
                  min={0}
                  defaultValue={arcarumContext.additionalTicketInfo ? arcarumContext.additionalTicketInfo.days : 0}
                  ref={additionalTicketInputRef}
                />
                日間
              </>
            ) : null}
          </div>
        </div>

        <div style={inputItemStyle}>
          <label style={labelStyle}>復刻イベント</label>
          <div style={inputGroupStyle}>
            <Select defaultValue={arcarumContext.renewalEventInterval || 'none'} ref={renewalEventSelectRef}>
              <option value="monthly">毎月</option>
              <option value="bimonthly">隔月</option>
              <option value="none">なし</option>
            </Select>
          </div>
        </div>
      </div>

      <div style={buttonContainerStyle}>
        <Button style={buttonStyle} onClick={onClickNext}>
          計算する！
        </Button>
      </div>
    </Page>
  );
});
