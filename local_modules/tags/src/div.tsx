import { forwardRef, LegacyRef } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

export const Div = forwardRef(({style, children, tag, childTag, numberOfLines, ellipsizeMode, ...rest}:TagProps, ref:LegacyRef<HTMLDivElement>) => {

  const Tag:any = tag || 'div';
  const ChildTag:any = childTag || 'p';
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
    <Tag
      {...rest} 
      ref={ref}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      { TagModule({ children, style:textStyle, tag:ChildTag, numberOfLines, ellipsizeMode }) }
    </Tag>
  )
})