import Image, { StaticImageData } from 'next/image';
import { useEffect, useState } from 'react';

export type SlideProps = {
  images: {
    uri: string | StaticImageData;
  }[];
  containerWidth?: number | '100%';
  // containerHeigth?: number | '100vh';
  // imageWidth: number | string;
  // imageHeight: number | 'auto';
  startIndex: number;
};

export function ImageSlide(props: SlideProps) {
  const {
    images,
    containerWidth = '100%',
    // imageWidth,
    startIndex = 0,
  } = props;

  const [index, setIndex] = useState<number>(startIndex);
  const [calcWidth, setCalcWidth] = useState<number>();

  useEffect(() => {
    const windowWidth = typeof window !== 'undefined' && window.innerWidth;
    const cal = (windowWidth as number) * 0.8;
    setCalcWidth(cal);
  }, []);

  const moveRight = (): void => {
    if (index !== images.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      setIndex(0);
    }
  };

  const moveLeft = (): void => {
    if (index !== 0) {
      setIndex((prev) => prev - 1);
    } else {
      setIndex(images.length - 1);
    }
  };

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
            transition: 'transform 0.5s',
            transform:
              typeof containerWidth === 'number'
                ? `translateX(-${index * containerWidth}px)`
                : `translateX(-${index * 100}vw)`,
          }}
        >
          {images.map((item, i) => (
            <Image
              alt={`${item.uri}`}
              key={i}
              src={item.uri}
              // priority={true}
              style={{
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
