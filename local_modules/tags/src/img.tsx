import Image from "next/image";
import { CSSProperties } from "react";
import { Div } from "./div";

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
        src ?
        <Image 
          alt={alt || 'image'} 
          onErrorCapture={(e) => {
            console.log('show image error', e);
          }}
          src={src} 
          width={width as number} 
          height={height as number} 
          style={{ objectFit: objectFit || 'contain', ...restStyle }}
        />
        :
        <Div 
          role="img"
          style={{ 
            backgroundColor: '#eeeeee', 
            alignItems: 'center',
            justifyContent: 'center',
            width,
            height,
            ...restStyle as any
        }}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="#ffffff"
            className="w-6 h-6"
            width={24}
            height={24}
          >
            <path fillRule="evenodd" d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z" clipRule="evenodd" />
          </svg>
        </Div>

      )
  }
}