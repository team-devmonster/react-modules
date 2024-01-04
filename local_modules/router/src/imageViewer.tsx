import { Modal, ModalProps } from './modal';
import ImageSlide, { SlideProps } from './imageSlide';
import { useEffect, useState } from 'react';

export function ImageViewer(
  props: ModalProps & Omit<SlideProps, 'moveLeft' | 'moveRight'>
) {
  const {
    visible,
    onRequestClose,
    images,
    startIndex,
    containerWidth,
    isLoop = false,
  } = props;

  const [index, setIndex] = useState<number>(
    isLoop ? startIndex + 1 : startIndex
  );
  const [imgs, _] = useState(
    isLoop ? [images[images.length - 1], ...images, images[0]] : images
  );
  const [animate, setAnimate] = useState(true);

  const moveRight = (): void => {
    if (index !== imgs.length - 1) {
      setIndex((prev) => prev + 1);
    } else {
      console.log('last one!');
    }
  };

  const moveLeft = (): void => {
    if (index !== 0) {
      setIndex((prev) => prev - 1);
    } else {
    }
  };

  useEffect(() => {
    if (isLoop && index === imgs.length - 1) {
      const timeoutId = setTimeout(() => {
        setAnimate(false);
        setIndex(1);
      }, 600);

      return () => {
        clearTimeout(timeoutId);
        setTimeout(() => {
          setAnimate(true);
        }, 300);
      };
    }

    if (isLoop && index === 0) {
      const timeoutId = setTimeout(() => {
        setAnimate(false);
        setIndex(imgs.length - 2);
      }, 600);

      return () => {
        clearTimeout(timeoutId);
        setTimeout(() => {
          setAnimate(true);
        }, 300);
      };
    }
  }, [index, isLoop, imgs.length]);

  return (
    <Modal visible={visible} onRequestClose={onRequestClose}>
      <div
        onClick={onRequestClose}
        id="overlay"
        style={{
          zIndex: 30,
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        }}
      >
        <button
          style={{
            position: 'absolute',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            top: 20,
            right: 20,
            width: 50,
            height: 50,
            borderRadius: 25,
          }}
        >
          <h1 style={{ color: '#8f8f8f' }}>✕</h1>
        </button>
      </div>
      <div
        style={{
          zIndex: 200,
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translateX(-50%) translateY(-50%)',
          width: containerWidth,
          // height: containerHeigth,
        }}
      >
        <ImageSlide
          moveLeft={moveLeft}
          moveRight={moveRight}
          animate={animate}
          images={imgs}
          startIndex={index}
          containerWidth={containerWidth}
          isLoop={isLoop}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          justifyContent: 'space-evenly',
          width: '50%',
          padding: '2rem',
          zIndex: 31,
          bottom: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          // padding: (calcWidth as number) > 768 ? '0 2rem' : '',
        }}
      >
        {images.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            style={{
              cursor: 'pointer',
              width: '1rem',
              height: '1rem',
              borderRadius: '50%',
              backgroundColor: isLoop
                ? i + 1 === index
                  ? 'white'
                  : '#b2b2b2'
                : i === index
                ? 'white'
                : '#b2b2b2',
            }}
          ></div>
        ))}
      </div>
    </Modal>
  );
}
