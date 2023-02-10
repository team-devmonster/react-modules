import { forwardRef, Ref, useEffect, useImperativeHandle, useRef } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

export const Div = forwardRef(({style, children, tag, childTag, numberOfLines, ellipsizeMode, onLayout, ...rest}:TagProps, ref:Ref<HTMLDivElement|null>) => {

  const tagRef = useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => tagRef.current);

  useEffect(() => {
    
    const handleResize = () => {
      if(!tagRef.current) return;
      // Set window width/height to state
      const { x, y, width, height  } = tagRef.current?.getBoundingClientRect();
      onLayout?.({ 
        nativeEvent: {
          layout: { width, height, x, y }
        }
      });
    }

    if(onLayout) {
      // only execute all the code below in client side
      // Handler to call on window resize
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
    }
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, [onLayout]); // Empty array ensures that effect is only run on mount

  const Tag:any = tag || 'div';
  const ChildTag:any = childTag || 'p';
  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.div?.style;

  const [
    textStyle,
    viewStyle
  ]
  = useTagStyle([
    textPattern
  ], [tagStyle, style]);
  
  return (
    <Tag
      {...rest} 
      ref={tagRef}
      style={{
        ...flexDefaultStyle,
        ...viewStyle
      }}>
      <TagModule
        tag={ChildTag}
        style={textStyle}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        >{children}</TagModule>
    </Tag>
  )
})