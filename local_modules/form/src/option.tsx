import { OptionProps } from "./type";

export function Option({ 
  value,
  children
}:OptionProps) {
  return (
    <option value={value}>{children}</option>
  )
}