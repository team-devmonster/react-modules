import { ReactNode } from 'react';

export type RowPorps = {
  children: ReactNode;
};

export default function Row({ children }: RowPorps) {
  return <div style={{ flexDirection: 'row', display: 'flex'}}>{children}</div>;
}
