import { forwardRef, LegacyRef } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

export const Div = forwardRef(({style, children, tag='div', ...rest}:TagProps & { tag?:string }, ref:LegacyRef<HTMLDivElement>) => {
  const Tag:any = tag;

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div?.style;

  const [
    textStyle, 
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [divTagStyle, style]);
  
  return (
    <Tag
      {...rest} 
      ref={ref}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      <TagModule style={textStyle}>{children}</TagModule>
    </Tag>
  )
})