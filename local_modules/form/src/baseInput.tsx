import { useEffect, useMemo, useRef } from "react";
import { FormValues, InputProps, InputType } from "./type";
import { Controller } from 'react-hook-form';
import { TagGroupConfig, useTags, useTagStyle } from '@team-devmonster/react-tags';

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
    onFocus,
    // input['type=file']
    accept,
    multiple,
    ...rules
  } = props;

  const { tagConfig } = useTags();
  const config = useMemo(() => getConfig({ tagConfig, type }), [tagConfig?.input, type]);
  const enterBubbleRef = useRef(false);
    
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
          config.tagStyle, 
          disabled ? config.tagDisabledStyle : undefined,
          error ? config.tagErrorStyle : undefined,
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
              if(num) num = +num;
              else num = 0;

              if(typeof rules.max === 'number') num > rules.max ? num = rules.max : null;
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
            root.style.setProperty('--placeholder', inputStyle.placeholderColor);
          }
        }, []);

        return (
          <input
            ref={ref}
            onChange={e => newOnChange(e.target.value)}
            onBlur={onBlur}
            value={newValue || ''}
            type={type}
            maxLength={typeof rules.maxLength === 'number' ? rules.maxLength : rules.maxLength?.value}
            max={typeof rules.max === 'number' ? rules.max : rules.max?.value}
            minLength={typeof rules.minLength === 'number' ? rules.minLength : rules.minLength?.value}
            min={typeof rules.min === 'number' ? rules.min : rules.min?.value}
            placeholder={placeholder}
            style={inputStyle}
            disabled={disabled}
            onKeyDown={onKeyDown}
            accept={accept}
            multiple={multiple}
            onKeyUp={e => {
              onKeyUp?.(e);
              if(e.key === 'Enter') {
                if(enterBubbleRef.current) return;
                enterBubbleRef.current = true;
                onEnter?.(e);
                setTimeout(() => {
                  enterBubbleRef.current = false;
                }, 100);
              } 
            }}
            onFocus={onFocus}
          />
        )
        }}
    />
  )
}


const getConfig = ({ tagConfig, type }:{ tagConfig:TagGroupConfig|undefined, type:InputType }) => {
  const inputTagStyle = tagConfig?.input?.style;
  const inputDisabledTagStyle = tagConfig?.input?.disabledStyle;
  const inputErrorTagStyle = tagConfig?.input?.errorStyle;

  return {
    tagStyle:  inputTagStyle,
    tagDisabledStyle: inputDisabledTagStyle,
    tagErrorStyle: inputErrorTagStyle
  }
}