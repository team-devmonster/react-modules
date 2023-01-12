import { FormValues, InputProps } from "./type";
import { BaseInput } from "./baseInput";
import { Checkbox } from "./checkbox";
import { Radio } from "./radio";
import { FileInput } from "./fileInput";

export function Input<T extends FormValues>(props:InputProps<T>) 
{
  const { type, ...rest } = props;

  switch(type) {
    case 'checkbox':
      return <Checkbox {...rest}/>;
    case 'radio':
      return <Radio {...rest}/>;
    case 'file':
      return <FileInput {...rest}/>;
    default:
      return <BaseInput type={type} {...rest}/>;
  } 
}