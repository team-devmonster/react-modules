import React, { forwardRef, LegacyRef, useMemo, useState } from "react";
import { useColorScheme, useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { ButtonStyle, FillProps, TagElement } from "./type";
import { darken, contrast, lighten } from "./utils";



export interface ButtonProps {
  tag?: 'div'|'button'|'a';
  children?: TagElement;
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  disabled?:boolean;
}

export const Button = forwardRef((
    {
      tag = 'button',
      color:_color, 
      fill:_fill, 
      style, 
      disabledStyle,
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
  const buttonTagStyle = tagConfig?.button?.style;
  const buttonTagDisabledStyle = tagConfig?.button?.disabledStyle;
  const buttonTagHoverStyle = tagConfig?.button?.hoverStyle;
  const color = _color || tagConfig?.button?.color;

  const fillStyle = useMemo(() => getFillStyle({ colorScheme, color, fill, buttonTagStyle }), [colorScheme, color, fill, buttonTagStyle]);

  const [isActive, setIsActive] = useState(false);
  const [isHover, setIsHover] = useState(false);

  const [
    textStyle, 
    etcStyle
  ]
  = useTagStyle([
    textPattern
  ], [
    fill !== 'none' ? buttonTagStyle : undefined, 
    disabled ? buttonTagDisabledStyle : undefined,
    isHover ? buttonTagHoverStyle : undefined,
    style,
    disabled ? disabledStyle : undefined,
    isHover ? hoverStyle : undefined,
  ]);

  const onPress = () => {
    setIsActive(true);
  }
  const onHover = () => {
    setIsHover(true);
  }
  const onLeave = () => {
    setIsActive(false);
    setIsHover(false);
  }

  return (
    <Tag 
      ref={ref}
      disabled={disabled} 
      style={{
        appearance: 'none',
        textAlign: 'left',
        cursor: 'pointer',
        ...flexDefaultStyle,
        borderWidth: fillStyle?.borderWidth,
        borderColor: fillStyle?.borderColor,
        backgroundColor: !isActive ? (etcStyle?.backgroundColor || fillStyle?.background?.base) : fillStyle?.background?.pressed,
        ...etcStyle
      }}

      onMouseDown={onPress}
      onTouchStart={onPress}
      
      onMouseMove={onHover}

      onMouseLeave={onLeave}
      onMouseOut={onLeave}
      onMouseUp={onLeave}
      onTouchEnd={onLeave}
      onTouchCancel={onLeave}

      onClick={onClick}
      
      {...rest}>
      <TagModule
        style={{
          color: fillStyle?.color,
          lineHeight: 1,
          ...textStyle
        }}>
        {children}
      </TagModule>
    </Tag>
  )
})


interface FillStyle {
  background: {
    base?:string,
    pressed?:string,
    ripple?:string
  },
  color?:string,
  borderColor?:string,
  borderWidth?:number,
  borderRadius?:number
}
const getFillStyle = ({ colorScheme, color, fill, buttonTagStyle }:{colorScheme:"light" | "dark" | null | undefined, color?: string, fill: FillProps, buttonTagStyle?:ButtonStyle}):FillStyle => {
  switch(fill) {
    case 'outline':
      return {
        background: {
          base: colorScheme === 'dark' ? '#000000' : '#ffffff',
          pressed: color ? `${color}3C` : undefined,
          ripple: color ? `${color}3C` : undefined
        },
        color: color,
        borderColor: color,
        borderWidth: 1
      }
    case 'translucent':
      return {
        background: {
          base: color ? `${color}32` : undefined,
          pressed: color ? `${color}4b` : undefined,
          ripple: color ? `${color}4b` : undefined,
        },
        color: color
      }
    case 'none':
      return {
        background: {
          base: color || 'transparent',
          pressed: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : 'transparent',
          ripple: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : 'transparent'
        },
        color: color ? contrast(color) : undefined,
        borderRadius: buttonTagStyle?.borderRadius
      }
    default:
      return {
        background: {
          base: color,
          pressed: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined,
          ripple: color ? colorScheme === 'dark' ? lighten(color, 30) : darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined
      }
  }
}