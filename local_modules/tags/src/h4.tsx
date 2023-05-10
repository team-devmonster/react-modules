import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const H4 = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.h4?.style;
  
  return (
    <Div 
      tag="h4"
      childTag="span"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}