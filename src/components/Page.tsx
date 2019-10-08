import * as React from 'react';
import { useMemo } from 'react';
import { BackButton } from './BackButton';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  enableBackButton?: boolean;
}

const pageStyle: React.CSSProperties = {
  position: 'absolute',
  left: '0',
  top: '0',
  color: 'white',
  width: '100%',
  height: '100%',
  padding: '2em',
  overflow: 'auto'
};

const backButtonContainerStyle: React.CSSProperties = {
  marginBottom: '1em'
};

export const Page: React.FC<PageProps> = ({ style, children, enableBackButton, ...props }) => {
  const combinedStyle = useMemo(() => ({ ...pageStyle, ...(style || {}) }), [style]);
  return (
    <div style={combinedStyle} {...props}>
      {enableBackButton ? (
        <div style={backButtonContainerStyle}>
          <BackButton />
        </div>
      ) : null}
      {children}
    </div>
  );
};
