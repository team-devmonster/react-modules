import React, { forwardRef, LegacyRef, useState } from "react";
import { useColorScheme, useTagStyle, textPattern, flexDefaultStyle, TagModule, useTags } from "./core";
import { ButtonStyle } from "./type";
import { darken, contrast } from "./utils";

export interface ButtonProps {
  tag?: 'div'|'button'|'a';
  children?: React.ReactNode;
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  color?: string;
  fill?: 'base' | 'outline' | 'translucent';
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
  const buttonTagStyle = tagConfig?.button?.style;
  const buttonTagDisabledStyle = tagConfig?.button?.disabledStyle;
  const color = _color || tagConfig?.button?.color;
  const fill = _fill || tagConfig?.button?.fill || 'base';

  const [isActive, setIsActive] = useState(false);

  let fillStyle:any;
  switch(fill) {
    case 'base':
      fillStyle = {
        background: {
          base: color,
          pressed: color ? darken(color, 30) : undefined,
          ripple: color ? darken(color, 30) : undefined
        },
        color: color ? contrast(color) : undefined
      }
      break;
    case 'outline':
      fillStyle = {
        background: {
          base: colorScheme === 'dark' ? '#000000' : '#ffffff',
          pressed: color || undefined,
          ripple: color || undefined
        },
        color: color || undefined,
        borderColor: color,
        borderWidth: 1
      }
      break;
    case 'translucent':
      fillStyle = {
        background: {
          base: color ? `${color}3C` : undefined,
          pressed: color || undefined,
          ripple: color || undefined
        },
        color: color || undefined
      }
      break;
  }

  const [
    textStyle, 
    etcStyle
  ]
  = useTagStyle([
    textPattern
  ], [
    buttonTagStyle, 
    disabled ? buttonTagDisabledStyle : undefined,
    style,
    disabled ? disabledStyle : undefined
  ]);

  const onPress = () => {
    setIsActive(true);
  }
  const onLeave = () => {
    setIsActive(false);
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
        ...etcStyle,
        borderWidth: fillStyle.borderWidth || etcStyle.borderWidth,
        borderColor: fillStyle.borderColor || etcStyle.borderColor,
        backgroundColor: !isActive ? (etcStyle?.backgroundColor || fillStyle.background.base) : fillStyle.background.pressed,
      }}

      onMouseDown={onPress}
      onTouchStart={onPress}

      onMouseLeave={onLeave}
      onMouseOut={onLeave}
      onMouseUp={onLeave}
      onTouchEnd={onLeave}
      onTouchCancel={onLeave}

      onClick={onClick}
      
      {...rest}>
      <TagModule
        style={{
          color: fillStyle.color,
          lineHeight: 1,
          ...textStyle
        }}>
        {children}
      </TagModule>
    </Tag>
  )
})