import { FormValues, InputProps } from "./type";
import { BaseInput } from "./baseInput";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type, ...rest } = props;

  switch(type) {
    case 'checkbox':
      return <Checkbox {...rest}/>;
    case 'radio':
      return <Radio {...rest}/>;
    default:
      return <BaseInput type={type} {...rest}/>;
  } 
}