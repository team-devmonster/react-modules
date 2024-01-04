import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

export type SlideProps = {
  images: {
    uri: string | StaticImageData;
  }[];
  containerWidth?: number | '100%';
  startIndex: number;
  isLoop?: boolean;
  animate?: boolean;
  moveRight: () => void;
  moveLeft: () => void;
};

export default function ImageSlide(props: SlideProps) {
  const {
    images,
    containerWidth = '100%',
    startIndex = 0,
    animate = true,
    moveRight,
    moveLeft,
  } = props;


  const [calcWidth, setCalcWidth] = useState<number>();
  const [mouseStartX, setMouseStartX] = useState<number>(0);
  const [calculatedX, setCalculatedX] = useState(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
    setMouseStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (!isDragging) return;

    setCalculatedX(e.clientX - mouseStartX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();

    if (calculatedX !== 0) {
      if (calculatedX > 200) {
        moveLeft();
      }

      if (calculatedX < -200) {
        moveRight();
      }
    }

    resetState();
  };

  const resetState = () => {
    setCalculatedX(0);
    setMouseStartX(0);
    setIsDragging(false);
  };
  useEffect(() => {
    const windowWidth = typeof window !== 'undefined' && window.innerWidth;
    const cal = (windowWidth as number) * 0.8;
    setCalcWidth(cal);
  }, []);

  return (
    <div>
      <div
        style={{
          width: containerWidth,
          height: 'auto',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            display: 'flex',
            width: `${images.length * 100}%`,
            height: '100%',
            transition: `transform ${animate ? 0.5 : 0}s`,
            transform:
              typeof containerWidth === 'number'
                ? `translateX(-${
                    startIndex * containerWidth + calculatedX
                  }px) translateX(${isDragging ? calculatedX : 0}px)`
                : `translateX(-${startIndex * 100}vw) translateX(${
                    isDragging ? calculatedX : 0
                  }px)`,
          }}
        >
          {images.map((item, i) => (
            <Image
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              alt={`${item.uri}`}
              key={i}
              src={item.uri}
              // priority={true}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                // zIndex: 30,
                maxWidth: 1200,
                minWidth: 368,
                width: calcWidth,
                height: 'auto',
                objectFit: 'cover',
                margin: '0 auto',
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
          position: 'absolute',
          zIndex: 31,
          top: '50%',
          transform: 'translateY(-50%)',
          padding: (calcWidth as number) > 768 ? '0 2rem' : '',
        }}
      >
        <button
          onClick={moveLeft}
          style={{
            cursor: 'pointer',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <h2 style={{ color: '#8f8f8f' }}>&lt;</h2>
        </button>
        <button
          onClick={moveRight}
          style={{
            cursor: 'pointer',
            padding: '1.5rem 2rem',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <h2 style={{ color: '#8f8f8f' }}>&gt;</h2>
        </button>
      </div>
    </div>
  );
}
