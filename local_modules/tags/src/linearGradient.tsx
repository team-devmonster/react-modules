import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { TagProps } from "./type";

interface LinearGradientProps extends TagProps {
  start:{x:number, y:number},
  end:{x:number, y:number},
  colors:string[],
  locations?:number[]
}
export const LinearGradient = forwardRef(({style, children, tag, childTag, numberOfLines, ellipsizeMode, onLayout, start, end, colors, locations, ...rest}:LinearGradientProps, ref:Ref<HTMLDivElement|null>) => {

  const tagRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useImperativeHandle(ref, () => tagRef.current);

  useEffect(() => {
    const handleResize = () => {
      if(!tagRef.current) return;
      // Set window width/height to state
      const { x, y, width, height } = tagRef.current?.getBoundingClientRect();
      onLayout?.({ 
        nativeEvent: {
          layout: { width, height, x, y }
        }
      });
      setSize({ width, height });
    }

    // only execute all the code below in client side
    // Handler to call on window resize
    // Add event listener
    window.addEventListener("resize", handleResize);
     
    // Call handler right away so state gets updated with initial window size
    handleResize();

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

  useMemo(() => {
    let url = '';
    if(!size.width || !size.height) return null;

    const c = document.createElement('canvas');
    c.width = size.width;
    c.height = size.height;
    const ctx = c.getContext("2d")!;

    // Create gradient
    const grd = ctx.createLinearGradient(size.width*start.x,size.height*start.y, size.width*end.x,size.height*end.y);

    colors.forEach((color, index) => {
      grd.addColorStop(index/(colors.length-1), color);
    });

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0,0,size.width,size.height);

    c.toBlob(blob => {
      url = URL.createObjectURL(blob!);
      tagRef.current!.style.backgroundImage = `url('${url}')`;
    })

    return () => {
      URL.revokeObjectURL(url);
    }
  }, [start, end, colors, size]);
  
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





// css background는 포기

/* const calcGradient = (x2:number, x1:number, y2:number, y1:number, W:number, H:number) => {
      console.log(H, y2 - y1, W, x2 - x1);
      const radFix = 90 * Math.PI / 180;
      let rad = Math.atan((W*(x2 - x1))/(H*(y2 - y1))) + radFix;
    
      const deg = (rad * 180 / Math.PI)+"deg";
      const Dc = Math.abs(W*Math.sin(rad)) + Math.abs(H*Math.cos(rad));
      const Ds = Math.sqrt(W*W*(x2 - x1)*(x2 - x1) + H*H*(y2 - y1)*(y2 - y1));
      const s=Dc/Ds;
      var d = (W*W*(x1 - 0.5)*(x1 - x2)+H*H*(y1 - 0.5)*(y1 - y2))/Math.sqrt(W*W*(x2 - x1)*(x2 - x1) + H*H*(y2 - y1)*(y2 - y1));
      var p = (((Dc/2 - d)*100) / Dc)+"%";
      console.log('2: angle, a, d, s, p', rad, deg, d, s, p);
      return {
        deg,
    
      }
    }
    const { deg } = calcGradient(end.x, start.x, end.y, start.y, size.width, size.height);

    console.log(deg);

    const colorWithPosition = colors.map((color, index) => {
      return `${color} 33.333333%`;
    })
    return {
      background: `linear-gradient(${deg}, ${colorWithPosition.join()})`
    } */