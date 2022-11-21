import { CSSProperties } from "react";

interface TagImageStyle extends Omit<CSSProperties, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  alt?: string,
  src: string,
  style?: TagImageStyle,
  onError?: React.ReactEventHandler,
  onLoad?: React.ReactEventHandler
}

export const Img = ({ src, style, ...rest }:ImgProps) => {

  const { objectFit, ...restStyle } = style || {};

  return (
    <img 
      {...rest}
      src={src}
      style={{
        objectFit: objectFit || 'contain',
        ...restStyle
      }}/>
  )
}