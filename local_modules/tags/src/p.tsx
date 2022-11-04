import { TagProps, useTags } from "./tags";
import { divDefaultStyle, TagModule, textPattern, useTagStyle } from "./utils";

export const P = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];
  const pTagStyle = tagConfig?.['p'];

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, pTagStyle, style]);
  
  return (
    <div style={{
      ...divDefaultStyle,
      ...viewStyle
    }} {...rest}>
      <TagModule style={textStyle}>{children}</TagModule>
    </div>
  )
}