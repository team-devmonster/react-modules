import { CSSProperties, useEffect, useState } from 'react';

export const ToastComponent = ({
  message,
  style,
  contentStyle,
  position = 'bottom',
}: {
  message: string;
  style?: CSSProperties;
  contentStyle?: CSSProperties;
  position?: 'top' | 'bottom';
}) => {
  const [opacity, setOpacity] = useState(0);
  const [translateY, setTranslateY] = useState(
    position === 'bottom' ? 20 : -20
  );

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
    transition: 'opacity 0.5s ease, transform 0.5s ease',
    ...style,
  };

  useEffect(() => {
    if (opacity === 0) {
      setOpacity(1);
      setTranslateY(0);
    }

    return () => {
      setOpacity(0);
    };
  }, []);

  return (
    <div id="toast-container" style={toastDefaltStyle}>
      <p style={{ textAlign: 'center', ...contentStyle }}>{message}</p>
    </div>
  );
};
