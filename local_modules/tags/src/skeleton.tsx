import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { injectStyle } from './utils';

export type SkeletonProps = {
  style?: CSSProperties;
  children?: ReactNode;
};

export function Skeleton({ style, children }: SkeletonProps) {
  const [tagStyle, _] = useState({
    skeleton: {
      WebkitAnimation: 'skeleton-gradient 1.8s infinite ease-in-out',
      animation: 'skeleton-gradient 1.8s infinite ease-in-out',
    },
  });

  useEffect(() => {
    const keyframesStyle = `
    @keyframes skeleton-gradient {
      0% { background-color: rgba(165, 165, 165, 0.1); }
      50% { background-color: rgba(165, 165, 165, 0.3); }
      100% { background-color: rgba(165, 165, 165, 0.1); }
    }
  `;
    injectStyle(keyframesStyle);
  }, []);

  return <div style={{ ...tagStyle.skeleton, ...style }}>{children}</div>;
}
