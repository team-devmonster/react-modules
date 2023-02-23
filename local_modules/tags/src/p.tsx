import { forwardRef, Ref } from "react";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const P = forwardRef(({tag, style, ...rest}:TagProps, ref:Ref<HTMLParagraphElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;
  
  return (
    <Div 
      ref={ref}
      tag={tag || 'p'}
      childTag="span"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
})