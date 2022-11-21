import { forwardRef, LegacyRef } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

export const Div = forwardRef(({style, children, ...rest}:TagProps, ref:LegacyRef<HTMLDivElement>) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div;

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, style]);
  
  return (
    <div
      {...rest} 
      ref={ref}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      <TagModule style={textStyle}>{children}</TagModule>
    </div>
  )
})