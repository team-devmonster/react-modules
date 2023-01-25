import { useTags } from "../core";
import { Div } from "../div";
import { TagProps } from "../type";

export const Th = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.th?.style;
  
  return (
    <Div
      style={{
        marginRight: -1,
        marginBottom: -1,
        ...tagStyle,
        ...style
      }} {...rest}></Div>
  )
}