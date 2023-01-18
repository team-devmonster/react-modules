import { forwardRef, LegacyRef } from "react";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = forwardRef(({style, children, ...rest}:TagProps, ref:LegacyRef<HTMLParagraphElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;
  
  return (
    <Div 
      tag="p"
      childTag="span"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
})