import { useTags, useTagStyle } from "./core";
import { TagProps } from "./type";


export const Span = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];
  const spanTagStyle = tagConfig?.['span'];

  const [
    newStyle
  ]
  = useTagStyle(
    [], 
    [divTagStyle, spanTagStyle, style]);
  
  return (
    <span style={newStyle} {...rest}>{children}</span>
  )
}
Span.displayName = 'Span';