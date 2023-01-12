import { useMemo } from "react";
import { FormValues, InputProps } from "./type";
import { Controller } from 'react-hook-form';
import { TagGroupConfig, useTags, useTagStyle } from "@team-devmonster/react-tags";

export function FileInput<T extends FormValues>(props:InputProps<T>) 
{
  const {
    control, 
    name,
    cameraText,
    albumText,
    cancelText,
    cameraButtonStyle,
    albumButtonStyle,
    cancelButtonStyle,
    placeholder,
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    returnKeyType,
    onKeyDown,
    onKeyUp,
    onEnter,
    onFocus,
    // input['type=file']
    accept,
    multiple,
    onClick,
    onChange:_onChange,
    ...rules
  } = props;

  const { tagConfig } = useTags();

  const config = useMemo(() => getConfig({ tagConfig }), [tagConfig?.input]);

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
          config.tagStyle, 
          disabled ? config.tagDisabledStyle : undefined,
          error ? config.tagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);
        
        return (
          <input
            ref={ref}
            onChange={e => {
              const filesObj = e.target.files;
              if(!filesObj?.length) return;
              const files = Array.from(filesObj);
              if(multiple) {
                onChange([...value, ...files]);
                _onChange?.({...e, target: { ...e.target, value: files }} as any);
              }
              else {
                onChange(files);
                _onChange?.({...e, target: { ...e.target, value: files }} as any);
              }
            }}
            onBlur={onBlur}
            value={value?.[0]?.filename || ''}
            type="file"
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            onKeyDown={onKeyDown}
            accept={accept}
            multiple={multiple}
            onKeyUp={e => {
              onKeyUp?.(e);
              if(e.key === 'Enter') onEnter?.(e);
            }}
            onFocus={onFocus}
          />
        )
      }}
    />
  )
}

const getConfig = ({ tagConfig }:{ tagConfig:TagGroupConfig|undefined }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  const tagStyle = tagConfig?.input?.['type=file']?.style;
  const tagDisabledStyle = tagConfig?.input?.['type=file']?.disabledStyle;
  const tagErrorStyle = tagConfig?.input?.['type=file']?.errorStyle;

  const cameraButtonStyle = tagConfig?.input?.['type=file']?.cameraButtonStyle;
  const albumButtonStyle = tagConfig?.input?.['type=file']?.albumButtonStyle;
  const cancelButtonStyle = tagConfig?.input?.['type=file']?.cancelButtonStyle;

  const cameraText = tagConfig?.input?.['type=file']?.cameraText;
  const albumText = tagConfig?.input?.['type=file']?.albumText;
  const cancelText = tagConfig?.input?.['type=file']?.cancelText;

  return {
    tagStyle:  {
      ...inputTagStyle,
      ...tagStyle
    },
    tagDisabledStyle: {
      ...inputDisabledTagStyle,
      ...tagDisabledStyle
    },
    tagErrorStyle: {
      ...inputErrorTagStyle,
      ...tagErrorStyle
    },
    cameraButtonStyle,
    albumButtonStyle,
    cancelButtonStyle,
    cameraText,
    albumText,
    cancelText
  }
}