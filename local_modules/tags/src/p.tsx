import { TagProps, useTags } from "./tags";
import { flexDefaultStyle, TagModule, textPattern, useTagStyle } from "./utils";

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
      ...flexDefaultStyle,
      ...viewStyle
    }} {...rest}>
      <TagModule style={textStyle}>{children}</TagModule>
    </div>
  )
}