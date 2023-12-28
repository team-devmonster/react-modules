import { CSSProperties, ReactNode } from 'react';

export type RowPorps = {
  children?: ReactNode;
  style?: CSSProperties;
};

export function Row({ children, style }: RowPorps) {
  return (
    <div style={{ flexDirection: 'row', display: 'flex', ...style }}>
      {children}
    </div>
  );
}
