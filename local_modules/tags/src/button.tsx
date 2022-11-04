import React, { useState } from "react";
import { TagStyle, useTags } from "./tags";
import { contrast, darken, divDefaultStyle, TagModule, textPattern, useColorScheme, useTagStyle } from "./utils";

export interface ButtonProps {
  tag?: 'div'|'button';
  children?: React.ReactNode;
  style?: TagStyle;
  color?: string;
  fill?: 'base' | 'outline' | 'translucent';
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
  disabled?:boolean;
}

export const Button = (
    {
      tag = 'button',
      color:_color, 
      fill:_fill, 
      style, 
      disabled, 
      onClick, 
      children,
      // onMouseDown etcs....
      ...rest
    }:ButtonProps
  ) => {

  const Tag:any = tag;
  const colorScheme = useColorScheme();
  const { tagConfig } = useTags();
  const buttonTagStyle = tagConfig?.['button']?.style;
  const color = _color || tagConfig?.['button']?.color;
  const fill = _fill || tagConfig?.['button']?.fill || 'base';

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
  ], [buttonTagStyle, style]);

  const onPress = () => {
    setIsActive(true);
  }
  const onLeave = () => {
    setIsActive(false);
  }

  return (
    <Tag 
      disabled={disabled} 
      style={{
        appearance: 'none',
        ...divDefaultStyle,
        borderStyle: 'solid',
        borderWidth: fillStyle.borderWidth || 0,
        borderColor: fillStyle.borderColor,
        ...etcStyle,
        backgroundColor: !isActive ? (etcStyle?.backgroundColor || fillStyle.background.base) : fillStyle.background.pressed,
      }}

      onMouseDown={onPress}
      onTouchStart={onPress}

      onMouseLeave={onLeave}
      onMouseOut={onLeave}
      onMouseUp={onLeave}
      onTouchEnd={onLeave}
      onTouchCancel={onLeave}
      
      {...rest}>
      <TagModule
        style={{
          color: fillStyle.color, 
          ...textStyle
        }}>
        {children}
      </TagModule>
    </Tag>
  )
}