import { paddingPattern, textPattern, useTagStyle, useTags } from "../core";
import { Div } from "../div";
import { Button } from "../button";
import { ThTdProps } from "../type";
import { A } from "../a";

export const Td = ({
    // normal props
    style, children, 
    // button props
    hoverStyle, onClick,
    //a props
    href, as, replace, push, back, reset, target, download,
    // etc
    ...rest
  }:ThTdProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.td?.style;
  const tagHoverStyle = tagConfig?.td?.hoverStyle;

  const [
    paddingStyle,
    textStyle,
    viewStyle
  ]
  = useTagStyle([
    paddingPattern,
    textPattern,
  ], [tagStyle, style]);

  const spanStyle:any = {};
  if(paddingStyle.padding ?? false) spanStyle.margin = paddingStyle.padding;
  if(paddingStyle.paddingTop ?? false) spanStyle.marginTop = paddingStyle.paddingTop;
  if(paddingStyle.paddingRight ?? false) spanStyle.marginRight = paddingStyle.paddingRight;
  if(paddingStyle.paddingLeft ?? false) spanStyle.marginLeft = paddingStyle.paddingLeft;
  if(paddingStyle.paddingBottom ?? false) spanStyle.marginBottom = paddingStyle.paddingBottom;
  
  return (
    onClick ?
      <Button
        tag="td"
        childTag="div"
        onClick={onClick}
        fill="none"
        style={{
          marginRight: -1,
          marginBottom: -1,
          ...viewStyle
        }}
        hoverStyle={{
          ...tagHoverStyle,
          ...hoverStyle
        }}
        {...rest}>
        <Div style={{...textStyle, ...spanStyle}}>
          {children}
        </Div>
      </Button>
    :
      <Div 
        tag="td"
        childTag="div"
        style={{
          marginRight: -1,
          marginBottom: -1,
          ...viewStyle
        }} 
        {...rest}>
        {
          href ?
          <A 
            href={href}
            as={as}
            replace={replace}
            push={push}
            back={back}
            reset={reset} 
            target={target} 
            download={download}>
            <Div style={{...textStyle, ...spanStyle}}>
              {children}
            </Div>
          </A>
          :
          <Div style={{...textStyle, ...spanStyle}}>
            {children}
          </Div>
        }
      </Div>
  )
}