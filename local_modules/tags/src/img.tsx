import { CSSProperties } from "react";

interface TagImageStyle extends Omit<CSSProperties, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: string,
  style?: TagImageStyle,
  resizeMode?: "contain" | "cover"
}

export const Img = ({ src, style, resizeMode = 'contain' }:ImgProps) => {

  return (
    <img 
      src={src} 
      style={{ 
        ...style,
        display: style?.display === 'inline-flex' ? 'flex' : style?.display
      }}/>
  )
}