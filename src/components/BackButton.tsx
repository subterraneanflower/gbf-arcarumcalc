import * as React from 'react';
import { useCallback } from 'react';
import { withRouter } from 'react-router';
import { Button } from './Button';

const backButtonStyle: React.CSSProperties = {
  fontSize: '0.7em',
  padding: '0.3em 1em'
};

export const BackButton = withRouter(props => {
  const onClick = useCallback(() => {
    props.history.goBack();
  }, [props.history]);

  return (
    <Button style={backButtonStyle} onClick={onClick}>
      &lt;戻る
    </Button>
  );
});
