import { forwardRef, LegacyRef, useMemo, useState } from "react";
import { useColorScheme, useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { ButtonProps, ColorSchemeName, FillProps, TagGroupConfig } from "./type";
import { darken, contrast, lighten } from "./utils";

export const Button = forwardRef((
    {
      tag = 'button',
      color, 
      fill:_fill, 
      style, 
      disabledStyle,
      activeStyle,
      hoverStyle,
      disabled,
      onClick, 
      children,
      // onMouseDown etcs....
      ...rest
    }:ButtonProps,
    ref:LegacyRef<HTMLButtonElement>
  ) => {

  const Tag:any = tag;
  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  
  const fill = _fill || tagConfig?.button?.fill || 'base';

  const styles = useMemo(() => getStyles({ tagConfig, colorScheme, color, fill }), [tagConfig?.button, colorScheme, color, fill]);
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
    hover ? styles.tagHoverStyle : undefined,
    hover ? hoverStyle : undefined,
    active ? styles.tagActiveStyle : undefined,
    active ? activeStyle : undefined,
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
      ref={ref}
      disabled={disabled}
      style={{
        appearance: 'none',
        textAlign: 'left',
        cursor: !disabled ? 'pointer' : 'default',
        ...flexDefaultStyle,
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
      { 
        TagModule({ 
          children, 
          style:{
            lineHeight: 1,
            ...textStyle
          }
        })
      }
    </Tag>
  )
})

const getStyles = ({ tagConfig, colorScheme, color:inlineColor, fill }:{tagConfig:TagGroupConfig|undefined, colorScheme:ColorSchemeName, color?:string, fill:FillProps}) => {
  const color = inlineColor || tagConfig?.button?.color || '#FF6420';

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
            backgroundColor: inlineColor ? inlineColor : 'transparent',
            rippleColor: colorScheme === 'dark' ? lighten(color, 55) : darken(color, 55)
          },
          activeStyle: {
            backgroundColor: colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: colorScheme === 'dark' ? lighten(color, 15) : darken(color, 15)
          }
        }
      default: // base
        return {
          style: {
            backgroundColor: color,
            rippleColor: colorScheme === 'dark' ? lighten(color, 55) : darken(color, 55),
            color: contrast(color)
          },
          activeStyle: {
            backgroundColor: colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30)
          },
          hoverStyle: {
            backgroundColor: colorScheme === 'dark' ? lighten(color, 15) : darken(color, 15)
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