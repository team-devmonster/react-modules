import { forwardRef, LegacyRef } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

export const Div = forwardRef(({style, children, ...rest}:TagProps, ref:LegacyRef<HTMLDivElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.div?.style;

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [tagStyle, style]);
  
  return (
    <div
      {...rest} 
      ref={ref}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      { TagModule({ children, style:textStyle }) }
    </div>
  )
})