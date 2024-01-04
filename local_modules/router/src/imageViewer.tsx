import { Modal, ModalProps } from './modal';
import { ImageSlide, SlideProps } from './imageSlide';

export function ImageViewer(props: ModalProps & SlideProps) {
  const {
    visible,
    onRequestClose,
    images,
    startIndex,
    // containerHeigth,
    containerWidth,
    // imageHeight,
    // imageWidth,
  } = props;
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
          images={images}
          startIndex={startIndex}
          // imageWidth={imageWidth}
          // imageHeight={imageHeight}
          containerWidth={containerWidth}
          // containerHeigth={containerHeigth}
        />
      </div>
    </Modal>
  );
}
