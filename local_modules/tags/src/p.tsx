import { textPattern } from "@team-devmonster/react-tags";
import { forwardRef, LegacyRef } from "react";
import { flexDefaultStyle, TagModule, useTags, useTagStyle } from "./core";
import { TagProps } from "./type";

export const P = forwardRef(({style, children, ...rest}:TagProps, ref:LegacyRef<HTMLParagraphElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;

  const [
    textStyle,
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [tagStyle, style]);
  
  return (
    <p 
      {...rest}
      ref={ref}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      { TagModule({ tag:'span', children, style:textStyle }) }
    </p>
  )
})