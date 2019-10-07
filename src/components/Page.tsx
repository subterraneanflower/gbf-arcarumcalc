import * as React from 'react';
import { useMemo } from 'react';
import { BackButton } from './BackButton';

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  enableBackButton?: boolean;
}

const pageStyle: React.CSSProperties = {
  backgroundColor: 'var(--bg-color)',
  color: 'white',
  width: '100%',
  height: '100%',
  padding: '2em',
  overflow: 'auto'
};

const backButtonContainerStyle: React.CSSProperties = {
  marginBottom: '0.5em'
};

export const Page: React.FC<PageProps> = ({ style, children, ...props }) => {
  const combinedStyle = useMemo(() => ({ ...pageStyle, ...(style || {}) }), [style]);
  return (
    <div style={combinedStyle} {...props}>
      {props.enableBackButton ? (
        <div style={backButtonContainerStyle}>
          <BackButton />
        </div>
      ) : null}
      {children}
    </div>
  );
};
