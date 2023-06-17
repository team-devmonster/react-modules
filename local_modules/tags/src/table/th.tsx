import { A } from "../a";
import { paddingPattern, textPattern, useTagStyle, useTags } from "../core";
import { Div } from "../div";
import { ThTdProps } from "../type";

export const Th = ({
    // normal props
    style, children, 
    //a props
    href, as, replace, push, back, reset, target, download,
    // etc
    ...rest
  }:ThTdProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.th?.style;

  const [
    paddingStyle,
    textStyle,
    viewStyle
  ]
  = useTagStyle([
    paddingPattern,
    textPattern
  ], [tagStyle, style]);

  const spanStyle:any = {};
  if(paddingStyle.padding ?? false) spanStyle.margin = paddingStyle.padding;
  if(paddingStyle.paddingTop ?? false) spanStyle.marginTop = paddingStyle.paddingTop;
  if(paddingStyle.paddingRight ?? false) spanStyle.marginRight = paddingStyle.paddingRight;
  if(paddingStyle.paddingLeft ?? false) spanStyle.marginLeft = paddingStyle.paddingLeft;
  if(paddingStyle.paddingBottom ?? false) spanStyle.marginBottom = paddingStyle.paddingBottom;
  
  return (
    <Div
      tag="th"
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