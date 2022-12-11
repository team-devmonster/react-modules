import { Div, TagElement, TagStyle, useTags } from '@team-devmonster/react-tags';

export interface FooterProps {
  children:TagElement,
  style?:TagStyle
}
export const Footer = (
  { 
    children,
    style
  }:FooterProps
  ) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.footer?.style;

  return (
    <Div 
      style={{
        ...tagStyle,
        ...style
      }}>
      { children }
    </Div>
  )
}
Footer.displayName = 'Footer';