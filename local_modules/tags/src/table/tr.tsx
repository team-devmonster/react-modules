import { useTags } from "../core";
import { Div } from "../div";
import { Button } from "../button";
import { ButtonProps } from "../type";

export const Tr = ({style, hoverStyle, onClick, ...rest}:ButtonProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.tr?.style;
  const tagHoverStyle = tagConfig?.tr?.hoverStyle;
  
  return (
    onClick ? 
      <Button
        tag="tr"
        onClick={onClick}
        fill="none"
        style={{
          flexDirection: 'row',
          paddingRight: 1,
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
        tag="tr"
        style={{
          flexDirection: 'row',
          paddingRight: 1,
          ...tagStyle,
          ...style
        }} {...rest}></Div>
  )
}