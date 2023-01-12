import { FormValues, SelectProps } from "./type";
import { Controller } from 'react-hook-form';
import { useTags, useTagStyle } from '@team-devmonster/react-tags';
import { useEffect } from "react";
import { Option } from "./option";

export function Select<T extends FormValues>({
  control, 
  name, 
  confirmText:_,
  cancelText:__,
  confirmButtonStyle:___,
  cancelButtonStyle:____,
  placeholder,
  disabled,
  style,
  disabledStyle,
  errorStyle,
  value,
  onClick,
  children,
  ...rules
}:SelectProps<T>) {

  const { tagConfig } = useTags();

  const inputTagStyle = tagConfig?.input?.style;
  const inputTagDisabledStyle = tagConfig?.input?.disabledStyle;
  const inputTagErrorStyle = tagConfig?.input?.errorStyle;
    
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={value}
      rules={rules as any}
      render={({ 
        field: { onChange, onBlur, value, ref },
        fieldState: { error }
        }) => {

        const [
          inputStyle
        ]
        = useTagStyle([
        ], [
          inputTagStyle,
          disabled ? inputTagDisabledStyle : undefined,
          error ? inputTagErrorStyle : undefined,
          style,
          disabled ? disabledStyle : undefined,
          error ? errorStyle : undefined
        ]);

        let newValue:string = value;
        let newOnChange = (e:any) => {
          onChange(e);
        }

        useEffect(() => {
          const root = document.documentElement;
          if(inputStyle.placeholderColor) {
            root.style.setProperty('::placeholder', inputStyle.placeholderColor);
          }
        }, []);

        return (
          <select
            ref={ref}
            onChange={newOnChange}
            onBlur={onBlur}
            value={newValue}
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
          >
            <Option value={null}>{placeholder||'선택'}</Option>
            {children}
          </select>
        )
        }}
    />
  )
}