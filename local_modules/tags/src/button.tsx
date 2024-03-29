import { forwardRef, Ref, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import { useTagStyle, textPattern, TagModule, useTags } from "./core";
import { ButtonProps, FillProps, TagGroupConfig } from "./type";
import { darken, lighten, getLightOrDark } from "./utils";

export const Button = forwardRef((
    {
      tag = 'button',
      animated:inlineAnimated,
      color:inlineColor, 
      fill:_fill, 
      style, 
      disabledStyle,
      activeStyle,
      hoverStyle,
      disabled,
      onClick, 
      children,
      childTag,
      numberOfLines,
      ellipsizeMode,
      onLayout,
      // onMouseDown etcs....
      ...rest
    }:ButtonProps,
    ref:Ref<HTMLButtonElement|null>
  ) => {

  const tagRef = useRef<HTMLButtonElement>(null);
  useImperativeHandle(ref, () => tagRef.current);

  useEffect(() => {
    let handleResize:() => void;
    if(onLayout) {
      handleResize = () => {
        if(!tagRef.current) return;
        // Set window width/height to state
        const { x, y, width, height  } = tagRef.current?.getBoundingClientRect();
        onLayout?.({ 
          nativeEvent: {
            layout: { width, height, x, y }
          }
        });
      }
      // only execute all the code below in client side
      // Handler to call on window resize
      // Add event listener
      window.addEventListener("resize", handleResize);
       
      // Call handler right away so state gets updated with initial window size
      handleResize();
    }
    // Remove event listener on cleanup
    return () => {
      if(handleResize) {
        window.removeEventListener("resize", handleResize);
      }
    }
  }, []); // Empty array ensures that effect is only run on mount

  const { tagConfig } = useTags();

  const Tag:any = tag;
  const animated = inlineAnimated ?? tagConfig?.button?.animated ?? true;
  const fill = _fill || tagConfig?.button?.fill || 'base';
  const color = useMemo(() => inlineColor || tagConfig?.button?.color || '#FF6420', [inlineColor, tagConfig?.button?.color]);
  const lightOrDark = useMemo(() => getLightOrDark(color), [color]);

  const styles = useMemo(() => getStyles({ tagConfig, color, inlineColor, lightOrDark, fill }), [tagConfig?.button, color, inlineColor, lightOrDark, fill]);
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);

  const [
    textStyle, 
    etcStyle
  ]
  = useTagStyle([
    textPattern
  ], [
    styles.tagStyle,
    style,
    animated && hover ? styles.tagHoverStyle : undefined,
    animated && hover ? hoverStyle : undefined,
    animated && active ? styles.tagActiveStyle : undefined,
    animated && active ? activeStyle : undefined,
    disabled ? styles.tagDisabledStyle : undefined,
    disabled ? disabledStyle : undefined
  ]);

  const onPress = () => {
    setActive(true);
  }
  const onHover = () => {
    setHover(true);
  }
  const onLeave = () => {
    setHover(false);
    setActive(false);
  }
  const onEnd = () => {
    setActive(false);
  }

  return (
    <Tag 
      className="devmonster-flex devmonster-button"
      ref={tagRef}
      disabled={disabled}
      style={{
        cursor: disabled ? 'default' : undefined,
        ...etcStyle
      }}

      onMouseDown={!disabled ? onPress : null}
      onTouchStart={!disabled ? onPress : null}
      
      onMouseMove={!disabled ? onHover : null}

      onMouseLeave={!disabled ? onLeave : null}
      onMouseOut={!disabled ? onLeave : null}
      onMouseUp={!disabled ? onEnd : null}
      onTouchEnd={!disabled ? onLeave : null}
      onTouchCancel={!disabled ? onLeave : null}

      onClick={!disabled ? onClick : null}
      
      {...rest}>
      <TagModule
        tag={childTag || 'div'}
        style={textStyle}
        numberOfLines={numberOfLines}
        ellipsizeMode={ellipsizeMode}
        >{children}</TagModule>
    </Tag>
  )
})

const getStyles = ({ tagConfig, color, fill, inlineColor, lightOrDark }:{tagConfig:TagGroupConfig|undefined, color:string, fill:FillProps, inlineColor?:string, lightOrDark:'light'|'dark'}) => {

  const tagStyle = tagConfig?.button?.style;
  const tagDisabledStyle = tagConfig?.button?.disabledStyle;
  const tagActiveStyle = tagConfig?.button?.activeStyle;
  const tagHoverStyle = tagConfig?.button?.hoverStyle;

  const fillType:`fill=${FillProps}` = `fill=${fill}`;
  const tagFillStyle = tagConfig?.button?.[fillType]?.style;
  const tagFillDisabeldStyle = tagConfig?.button?.[fillType]?.disabledStyle;
  const tagFillActiveStyle = tagConfig?.button?.[fillType]?.activeStyle;
  const tagFillHoverStyle = tagConfig?.button?.[fillType]?.hoverStyle;

  const defaultStyle = (() => {
    switch(fill) {
      case 'outline':
        return {
          style: {
            backgroundColor: 'transparent',
            rippleColor: `${color}32`,
            color: color,
            borderColor: color,
            borderWidth: 1
          },
          activeStyle: {
            backgroundColor: `${color}19`
          },
          hoverStyle: {
            backgroundColor: `${color}0F`
          }
        }
      case 'translucent':
        return {
          style: {
            backgroundColor: `${color}32`,
            rippleColor: `${color}5A`,
            color: color
          },
          activeStyle: {
            backgroundColor: `${color}4b`
          },
          hoverStyle: {
            backgroundColor: `${color}19`
          }
        }
      case 'clear':
        return {
          style: {
            backgroundColor: 'transparent',
            rippleColor: `${color}32`,
            color: color
          },
          activeStyle: {
            backgroundColor: `${color}19`
          },
          hoverStyle: {
            backgroundColor: `${color}19`
          }
        }
      case 'none':
        return {
          style: {
            backgroundColor: inlineColor || 'transparent',
            rippleColor: lightOrDark === 'dark' ? lighten(color, 55) : darken(color, 55)
          },
          activeStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 15) : darken(color, 15)
          }
        }
      default: // base
        return {
          style: {
            backgroundColor: color,
            rippleColor: lightOrDark === 'dark' ? lighten(color, 55) : darken(color, 55),
            color: lightOrDark === 'dark' ? '#ffffff' : '#000000'
          },
          activeStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: lightOrDark === 'dark' ? lighten(color, 15) : darken(color, 15)
          }
        }
    }
  })()

  if(color === 'transparent') {
    defaultStyle.style.backgroundColor = 'transparent';
    defaultStyle.style.rippleColor = 'transparent';
    defaultStyle.activeStyle.backgroundColor = 'transparent';
  }

  if(fill !== 'none') {
    return {
      tagStyle: {
        ...defaultStyle.style,
        ...tagStyle,
        ...tagFillStyle
      },
      tagDisabledStyle: {
        ...tagDisabledStyle,
        ...tagFillDisabeldStyle
      },
      tagActiveStyle: {
        ...defaultStyle.activeStyle,
        ...tagActiveStyle,
        ...tagFillActiveStyle
      },
      tagHoverStyle: {
        ...defaultStyle.hoverStyle,
        ...tagHoverStyle,
        ...tagFillHoverStyle
      }
    }
  }
  else {
    return {
      tagStyle: {
        ...defaultStyle.style,
        ...tagFillStyle
      },
      tagDisabledStyle: {
        ...tagFillDisabeldStyle
      },
      tagActiveStyle: {
        ...defaultStyle.activeStyle,
        ...tagFillActiveStyle
      },
      tagHoverStyle: {
        ...defaultStyle.hoverStyle,
        ...tagFillHoverStyle
      }
    }
  }
}