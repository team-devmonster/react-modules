import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";


export const P = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;
  const pTagStyle = tagConfig?.p;

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