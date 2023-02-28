import { useMemo, useRef } from "react";
import { Controller } from 'react-hook-form';

import { FormValues, InputProps } from "./type";
import { useTags, useTagStyle, TagGroupConfig, ToggleStyle, Button, Div } from '@team-devmonster/react-tags';
import { formStyles, getIcon } from "./utils";
export interface ToggleProps<T extends FormValues = any> extends Omit<InputProps<T>, 'placeholder'> {
  style?:ToggleStyle,
  checkedStyle?:ToggleStyle,
  disabledStyle?:ToggleStyle,
  errorStyle?:ToggleStyle
}
export function Toggle<T extends FormValues>({
    control, 
    name, 
    disabled,
    style,
    checkedStyle,
    disabledStyle,
    errorStyle,
    value,
    onClick,
    ...rules
  }:ToggleProps<T>) 
{
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.toggle]);

  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      rules={rules as any}
      render={({
        field: { ref, onChange, value, onBlur },
        fieldState: { error }
       }) => {

        const [
          contentStyle
        ]
        = useTagStyle([
        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          value ? styles.tagCheckedStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined,
          value ? checkedStyle : undefined
        ]);

        const { icon, iconStyle } = useMemo(() => getIcon({ iconObj: contentStyle}), [contentStyle.icon]);

        const widthRef = useRef<{ width:number, iconWidth:number }>({ width: 60, iconWidth: 30 });

        const contentBackgroundColor = useRef<string>('#cccccc');
        const contentCheckedBackgroundColor = useRef<string>('#FF6420');


        const iconBackgroundColor = useRef<string>('#ffffff');
        const iconCheckedBackgroundColor = useRef<string>('#FF6420');
        
        useMemo(() => {
          if(value) {
            contentCheckedBackgroundColor.current = contentStyle.backgroundColor || '#FF6420';
            iconCheckedBackgroundColor.current = iconStyle.color as string || '#FF6420';
          }
          else {
            contentBackgroundColor.current = contentStyle.backgroundColor || '#cccccc';
            iconBackgroundColor.current = iconStyle.color as string || '#cccccc';
          }
        }, [value])

        return (
          <Button
            style={{
              width: contentStyle.width || 60,
              height: iconStyle.height || 30,
              justifyContent: 'center',
              borderRadius: 20
            }}
            fill="none"
            disabled={disabled}
            onLayout={(e) => {
              const { width } = e.nativeEvent.layout;
              widthRef.current.width = width;
            }}
            onClick={(e) => {
              const newValue = !value;
              onChange(newValue);
              onClick?.({...e, value: newValue});
            }}>
              <input
                type="none"
                ref={ref}
                onBlur={onBlur}
                style={formStyles.dummyInput}
                name={name}
              />
              <Div
                style={{ 
                  width: '100%', 
                  height: 20, 
                  borderRadius: 20,
                  ...contentStyle
                }}></Div>
              {
                icon ?
                  icon
                :
                  <Div
                    onLayout={(e) => {
                      const { width } = e.nativeEvent.layout;
                      widthRef.current.iconWidth = width;
                    }}
                    style={{
                      ...defaultStyle.iconStyle, 
                      ...iconStyle as any
                    }}>
                  </Div>
              }
          </Button>
        )
       }}
    />
  )
}

const getStyles = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const tagStyle = tagConfig?.toggle?.style;
  const tagCheckedStyle = tagConfig?.toggle?.checkedStyle;
  const tagDisabledStyle = tagConfig?.toggle?.disabledStyle;
  const tagErrorStyle = tagConfig?.toggle?.errorStyle;

  return {
    tagStyle,
    tagCheckedStyle,
    tagDisabledStyle,
    tagErrorStyle
  }
}

const defaultStyle = {
  iconStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 30,
    height: 30,
    borderRadius: 15
  }
}