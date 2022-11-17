import { useTagStyle, textPattern, flexDefaultStyle, TagModule } from "./core";
import { useTags } from "./tags";
import { TagProps } from "./type";

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