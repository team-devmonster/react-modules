import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const Nav = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.menu?.style;
  
  return (
    <Div 
      tag="nav"
      childTag="span"
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}