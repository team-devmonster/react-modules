import { forwardRef, Ref } from "react";
import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";
import { useCreateStyle } from "./useCreateStyle";

export const P = forwardRef(({tag, style, ...rest}:TagProps, ref:Ref<HTMLParagraphElement>) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.p?.style;

  const { newStyle } = useCreateStyle({
    newStyle: { 
      ...tagStyle,  
      ...style 
    }
  }, [tagStyle, style]);
  
  return (
    <Div 
      ref={ref}
      tag={tag || 'p'}
      childTag="span"
      style={newStyle} {...rest}></Div>
  )
})