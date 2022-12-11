import { useMemo } from "react";
import { Control, Controller, Path as Names } from 'react-hook-form';

import { FormValues, InputRuleProps } from "./type";
import { TagStyle, useTags, useTagStyle, TagGroupConfig, borderPattern } from '@team-devmonster/react-tags';


const radioDefaultStyle:TagStyle = {
  width: 38,
  height: 38,
  borderColor: '#dedede',
  borderWidth: 1,
  justifyContent: 'center',
  alignItems: 'center'
}
export interface RadioProps<T extends FormValues = any> extends InputRuleProps {
  control:Control<T>,
  name:Names<T>,
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}
export function Radio<T extends FormValues>(
  {
    control, 
    name, 
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    ...rules
  }:RadioProps<T>) 
{
  const { tagConfig } = useTags();
  
  const styles = useMemo(() => getStyles({ tagConfig }), [tagConfig?.input]);

  return (
    <Controller
      control={control}
      name={name}
      rules={rules as any}
      render={({ 
        field: { ref, onChange, value:fieldValue, onBlur },
        fieldState: { error }
       }) => {

        const [
          newStyle
        ]
        = useTagStyle([

        ], [
          styles.tagStyle, 
          disabled ? styles.tagDisabledStyle : undefined,
          error ? styles.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        return (
          <input 
            ref={ref}
            onChange={e => {
              onChange(e.target.value);
            }}
            onBlur={onBlur}
            value={value}
            checked={fieldValue === value}
            type="radio"
            style={{
              ...radioDefaultStyle,
              ...newStyle
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

  const radioTagStyle = tagConfig?.input?.["type=radio"]?.style;
  const radioTagDisabledStyle = tagConfig?.input?.["type=radio"]?.disabledStyle;
  const radioTagErrorStyle = tagConfig?.input?.["type=radio"]?.errorStyle;

  return {
    tagStyle:  {
      ...borderStyle,
      borderRadius: 50,
      backgroundColor: backgroundColor,
      ...radioTagStyle
    },
    tagDisabledStyle: {
      ...borderDisabledStyle,
      backgroundColor: backgroundDisabledColor,
      ...radioTagDisabledStyle
    },
    tagErrorStyle: {
      ...borderErrorStyle,
      backgroundColor: backgroundErrorColor,
      ...radioTagErrorStyle
    }
  }
}