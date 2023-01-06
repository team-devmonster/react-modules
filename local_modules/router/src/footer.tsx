import { Div, TagElement, TagStyle, useTags } from '@team-devmonster/react-tags';
import { forwardRef, Ref } from 'react';

export interface FooterProps {
  children:TagElement,
  style?:TagStyle
}
export const Footer = forwardRef((
  { 
    children,
    style
  }:FooterProps,
  ref:Ref<HTMLDivElement>
  ) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.footer?.style;

  return (
    <Div 
      ref={ref}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        ...tagStyle,
        ...style
      }}>
      { children }
    </Div>
  )
})
Footer.displayName = 'Footer';