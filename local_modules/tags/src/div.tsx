import { TagProps, useTags } from "./tags";
import { flexDefaultStyle, TagModule, textPattern, useTagStyle } from "./utils";

export const Div = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, style]);
  
  return (
    <div style={{
      ...flexDefaultStyle,
      ...viewStyle
    }} {...rest}>
      <TagModule style={textStyle}>{children}</TagModule>
    </div>
  )
}