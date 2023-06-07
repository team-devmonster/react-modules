import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Table = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.table?.style;
  
  return (
    <Div 
      tag="table"
      style={{
        ...tagStyle,
        ...style
      }} {...rest}></Div>
  )
}