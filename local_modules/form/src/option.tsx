//import { useMemo } from "react";
import { OptionProps } from "./type";

export function Option({ 
  value,
  children,
  disabled
}:OptionProps):JSX.Element {
  return (
    <option value={value} disabled={disabled}>{children}</option>
  )
}