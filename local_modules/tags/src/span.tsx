import { useTags, useTagStyle } from "./core";
import { TagProps } from "./type";


export const Span = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div?.style;
  const spanTagStyle = tagConfig?.span?.style;

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