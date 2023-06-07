import { useTags } from "../core";
import { Div } from "../div";
import { Button } from "../button";
import { ButtonProps } from "../type";

export const Td = ({style, hoverStyle, onClick, ...rest}:ButtonProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.td?.style;
  const tagHoverStyle = tagConfig?.td?.hoverStyle;
  
  return (
    onClick ?
      <Button
        tag="td"
        onClick={onClick}
        fill="none"
        style={{
          marginRight: -1,
          marginBottom: -1,
          ...tagStyle,
          ...style
        }}
        hoverStyle={{
          ...tagHoverStyle,
          ...hoverStyle
        }}
        {...rest}></Button>
    :
      <Div 
        tag="td"
        style={{
          marginRight: -1,
          marginBottom: -1,
          ...tagStyle, 
          ...style
        }} {...rest}></Div>
  )
}