import * as React from 'react';
import { useMemo } from 'react';

const selectContainerStyle: React.CSSProperties = {
  position: 'relative',
  display: 'inline-block'
};

const selectStyle: React.CSSProperties = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundColor: 'white',
  border: 'none',
  fontSize: '1em',
  padding: '0.3em 2em 0.3em 1em',
  height: '2.5em'
};

const indicatorStyle: React.CSSProperties = {
  display: 'inline-block',
  position: 'absolute',
  right: '0.8em',
  top: '0',
  bottom: '0',
  fontSize: '0.7em',
  color: 'black',
  margin: 'auto 0',
  height: 'max-content',
  pointerEvents: 'none'
};

export const Select = React.forwardRef<HTMLSelectElement, React.SelectHTMLAttributes<HTMLSelectElement>>(
  ({ style, ...props }, ref) => {
    const combinedStyle = useMemo(() => ({ ...selectStyle, ...(style || {}) }), [style]);
    return (
      <span style={selectContainerStyle}>
        <select style={combinedStyle} {...props} ref={ref} />
        <span style={indicatorStyle}>▼</span>
      </span>
    );
  }
);
