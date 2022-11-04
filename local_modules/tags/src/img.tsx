import { CSSProperties } from "react";

interface TagImageStyle extends Omit<CSSProperties, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: string,
  style?: TagImageStyle,
  objectFit?: "contain" | "cover"
}

export const Img = ({ src, style, objectFit = 'contain' }:ImgProps) => {

  return (
    <img 
      src={src}
      style={{
        ...style,
        objectFit
      }}/>
  )
}