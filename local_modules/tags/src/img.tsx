import Image from "next/image";
import { CSSProperties } from "react";

interface TagImageStyle extends Omit<CSSProperties, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  alt?: string,
  src: any,
  style?: TagImageStyle,
  onError?: React.ReactEventHandler,
  onLoad?: React.ReactEventHandler
}

export const Img = ({ src, style, alt, ...rest }:ImgProps) => {

  const { objectFit, width, height, ...restStyle } = style || {};

  switch(typeof src) {
    case 'string':
      return (
        <img 
          {...rest}
          alt={alt || 'image'}
          src={src}
          style={{
            objectFit: objectFit || 'contain',
            width,
            height,
            ...restStyle
          }}/>
      )
    default:
      return (
        <Image alt={alt || 'image'} src={src} width={width as number} height={height as number} style={{ objectFit: objectFit || 'contain', ...restStyle }}/>
      )
  }
}