import { forwardRef, LegacyRef, useMemo } from "react";
import { useTags, useTagStyle } from "./core";
import { TagProps } from "./type";


export const Span = forwardRef(({style, children, ...rest}:TagProps, ref:LegacyRef<HTMLSpanElement>) => {

  const { tagConfig } = useTags();
  const divTagStyle = tagConfig?.div?.style;
  const spanTagStyle = tagConfig?.span?.style;

  const [
    newStyle
  ]
  = useTagStyle(
    [], 
    [divTagStyle, spanTagStyle, style]);

  const lineHeight = useMemo(() => {
    if(typeof newStyle.lineHeight == 'number' && newStyle.fontSize) {
      return newStyle.lineHeight/newStyle.fontSize;
    }
    else {
      return 1.28;
    }
  }, [newStyle.fontSize, newStyle.lineHeight])
  
  return (
    <span 
      ref={ref}
      style={{
        ...newStyle,
        lineHeight
      }} {...rest}>{children}</span>
  )
})
Span.displayName = 'Span';