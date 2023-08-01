import { forwardRef, Ref } from "react";
import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Tbody = forwardRef(({style, ...rest}:TagProps, ref:Ref<HTMLDivElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.tbody?.style;
  
  return (
    <Div 
      ref={ref}
      tag="tbody"
      style={{
        ...tagStyle,
        ...style
      }} {...rest}></Div>
  )
})