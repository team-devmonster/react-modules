import { FormValues, Options, SelectProps } from "./type";
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
          const index:number = e.target.selectedIndex;
          if(index > 0) {
            const options = getOptions({ children });
            const option = options[index-1] as JSX.Element;
            onChange(option.props.value);
          }
          else {
            onChange(null);
          }
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

const getOptions = ({children}:{children:Options|Options[]}):Options[] => {
  let options:Options[] = [];
  if(Array.isArray(children)) {
    for(let i = 0; i < children.length; i++) {
      const child = children[i];
      if(Array.isArray(child)) {
        child.forEach(cChild => {
          options.push(cChild);
        })
      }
      else {
        options.push(child);
      }
    }
  }
  else {
    const child = children;
    if(child) {
      options.push(child);
    }
    else {
      // nothing
    }
  }
  return options;
}