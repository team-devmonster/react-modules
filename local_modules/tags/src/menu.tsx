import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const Menu = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.menu?.style;
  
  return (
    <Div 
      tag="menu"
      childTag="span"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}