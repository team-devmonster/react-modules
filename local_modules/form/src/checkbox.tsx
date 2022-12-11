import { useMemo } from "react";
import { Control, Controller, Path as Names } from 'react-hook-form';

import { FormValues, InputProps } from "./type";
import { TagStyle, useTags, useTagStyle, borderPattern, TagGroupConfig } from '@team-devmonster/react-tags';
export interface CheckboxProps<T extends FormValues = any> extends Omit<InputProps<T>, 'placeholder'> {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
export function Checkbox<T extends FormValues>({
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    onClick,
    ...rules
  }:CheckboxProps<T>) 
{
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);

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
          inputStyle
        ]
        = useTagStyle([

        ], [
          styles.checkboxTagStyle, 
          disabled ? styles.checkboxTagDisabledStyle : undefined,
          error ? styles.checkboxTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <input
            ref={ref}
            name={name}
            onClick={(e:any) => {
              //const newValue = !value;
              //onChange(newValue);
              onClick?.(e);
            }}
            checked={value}
            onChange={(e) => {
              console.log(e.target.checked);
              const newValue = e.target.checked;
              onChange(newValue);
            }}
            onBlur={onBlur}
            type="checkbox"
            style={{
              width: 38,
              height: 38,
              ...inputStyle
            }}
            disabled={disabled}
          />
        )
       }}
    />
  )
}

const getStyles = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const borderStyle = inputTagStyle ? 
    Object.entries(inputTagStyle)
      .filter(([key]) => borderPattern.test(key))
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundColor = inputTagStyle?.backgroundColor;

  const borderDisabledStyle = inputDisabledTagStyle ? 
    Object.entries(inputDisabledTagStyle)
      .filter(([key]) => borderPattern.test(key)) 
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundDisabledColor = inputDisabledTagStyle?.backgroundColor;

  const borderErrorStyle = inputErrorTagStyle ? 
    Object.entries(inputErrorTagStyle)
      .filter(([key]) => borderPattern.test(key))
      .reduce((sum, cur) => ({ ...sum, [cur[0]]:cur[1] }), {}) : null;
  const backgroundErrorColor = inputErrorTagStyle?.backgroundColor;

  const checkboxTagStyle = tagConfig?.input?.["type=checkbox"]?.style;
  const checkboxTagDisabledStyle = tagConfig?.input?.["type=checkbox"]?.disabledStyle;
  const checkboxTagErrorStyle = tagConfig?.input?.["type=checkbox"]?.errorStyle;

  return {
    checkboxTagStyle:  {
      ...borderStyle,
      backgroundColor: backgroundColor,
      ...checkboxTagStyle
    },
    checkboxTagDisabledStyle: {
      ...borderDisabledStyle,
      backgroundColor: backgroundDisabledColor,
      ...checkboxTagDisabledStyle
    },
    checkboxTagErrorStyle: {
      ...borderErrorStyle,
      backgroundColor: backgroundErrorColor,
      ...checkboxTagErrorStyle
    }
  }
}