import { CSSProperties } from "react";

interface TagImageStyle extends Omit<CSSProperties, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: string,
  style?: TagImageStyle
}

export const Img = ({ src, style }:ImgProps) => {

  const { objectFit, ...restStyle } = style || {};

  return (
    <img 
      src={src}
      style={{
        objectFit: objectFit || 'contain',
        ...restStyle
      }}/>
  )
}