import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const Dd = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.dd?.style;
  
  return (
    <Div 
      tag="dd"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}