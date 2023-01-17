import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const Dl = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.dl?.style;
  
  return (
    <Div 
      tag="dl"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}