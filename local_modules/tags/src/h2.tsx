import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const H2 = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.h2?.style;
  
  return (
    <Div 
      tag="h2"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}