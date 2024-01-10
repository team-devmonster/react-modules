import { CSSProperties, useEffect, useState } from 'react';

export const ToastComponent = ({
  message,
  style,
  contentStyle,
}: {
  message: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
}) => {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(20);

  const toastDefaltStyle: CSSProperties = {
    width: '380px',
    position: 'static',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: '#fff',
    padding: '10px',
    borderRadius: '12px',
    margin: '12px 0',
    whiteSpace: 'pre-line',
    opacity: opacity,
    visibility: opacity === 0 ? 'hidden' : 'visible',
    transform: `translateY(${translateY}px)`,
    transition: 'opacity 0.6s ease, transform 0.5s ease', // 애니메이션 트랜지션 설정
    ...style,
  };

  useEffect(() => {
    if (opacity === 0) {
      setOpacity(1);
      setTranslateY(0);
    }

    return () => {
      setOpacity(0);
      setTranslateY(20);
    };
  }, []);

  return (
    <div id="toast-container" style={toastDefaltStyle}>
      <p style={{ textAlign: 'center', ...contentStyle }}>{message}</p>
    </div>
  );
};
