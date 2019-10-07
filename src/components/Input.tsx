import * as React from 'react';
import { useMemo } from 'react';

const inputStyle: React.CSSProperties = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundColor: 'white',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  borderBottom: '2px solid var(--arcarum-red)',
  borderRadius: '3px',
  fontSize: '1em',
  padding: '0.3em 0.5em',
  height: '2.5em'
};

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ style, ...props }, ref) => {
    const combinedStyle = useMemo(() => ({ ...inputStyle, ...(style || {}) }), [style]);
    return <input style={combinedStyle} {...props} ref={ref} />;
  }
);
