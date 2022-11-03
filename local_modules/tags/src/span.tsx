import { TagProps, useTags } from "./tags";
import { useTagStyle } from "./utils";
// import { textPattern } from "./utils";

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