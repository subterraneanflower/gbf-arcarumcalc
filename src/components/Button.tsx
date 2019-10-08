import * as React from 'react';
import { useMemo } from 'react';

const buttonStyle: React.CSSProperties = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  backgroundColor: 'var(--arcarum-red)',
  border: 'none',
  borderRadius: '3px',
  color: 'white',
  fontSize: '1em',
  padding: '0.8em 2em',
  textAlign: 'center',
  cursor: 'pointer'
};

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, ...props }) => {
  const combinedStyle = useMemo(() => ({ ...buttonStyle, ...(style || {}) }), [style]);
  return <button style={combinedStyle} {...props} />;
};
