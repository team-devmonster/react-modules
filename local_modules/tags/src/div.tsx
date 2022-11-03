import { TagProps, useTags } from "./tags";
import { divDefaultStyle, useTagStyle } from "./utils";

export const Div = ({style, children, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.['div'];

  const [
    newStyle,
  ]
  = useTagStyle([
  ], [divTagStyle, style]);
  
  return (
    <div style={{
      ...divDefaultStyle,
      ...newStyle
    }} {...rest}>
      {children}
    </div>
  )
}