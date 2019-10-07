import * as React from 'react';
import { useMemo } from 'react';

const evokerButtonStyle: React.CSSProperties = {
  appearance: 'none',
  WebkitAppearance: 'none',
  MozAppearance: 'none',
  display: 'block',
  backgroundColor: 'var(--arcarum-red)',
  border: 'none',
  borderRadius: '3px',
  color: 'white',
  fontSize: '0.8em',
  padding: '1em 0',
  textAlign: 'center',
  cursor: 'pointer'
};

export const SelectButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = ({ style, ...props }) => {
  const combinedStyle = useMemo(() => ({ ...evokerButtonStyle, ...(style || {}) }), [style]);
  return <button style={combinedStyle} {...props} />;
};
