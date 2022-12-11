import { useEffect } from "react";
import { FormValues, InputProps } from "./type";
import { Controller } from 'react-hook-form';
import { useTags, useTagStyle } from '@team-devmonster/react-tags';

export function BaseInput<T extends FormValues>(props:InputProps<T>) 
{
  const {
    control, 
    name,
    placeholder,
    disabled,
    style,
    disabledStyle,
    errorStyle,
    value,
    type = 'text',
    returnKeyType,
    onKeyDown,
    onKeyUp,
    onEnter,
    ...rules
  } = props;

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
        let newOnChange = onChange;

        switch(type) {
          case 'number':
            newValue = String(value || '0');
            newOnChange = (v) => {
              let num = v.replace(/\D+/g, '');
              onChange(num ? +num : 0);
            }
            break;
          case 'tel':
            let tel = (value as string)?.replace(/\D+/g, '').replace(/(\d{2,3})(\d{3,4})(\d{4})/, "$1-$2-$3");
            newValue = tel;
            newOnChange = (v) => {
              let num = v.replace(/\D+/g, '');
              onChange(num);
            }
            rules.maxLength = rules.maxLength || 13;
            break;
          /* case 'password':
            break; */
        }

        useEffect(() => {
          const root = document.documentElement;
          if(inputStyle.placeholderColor) {
            root.style.setProperty('::placeholder', inputStyle.placeholderColor);
          }
        }, []);

        return (
          <input
            ref={ref}
            onChange={e => newOnChange(e.target.value)}
            onBlur={onBlur}
            value={newValue}
            type={type}
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            onKeyDown={onKeyDown}
            onKeyUp={e => {
              onKeyUp?.(e);
              if(e.key === 'Enter') onEnter?.(e);
            }}
          ></input>
        )
        }}
    />
  )
}