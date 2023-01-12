//import { useMemo } from "react";
import { OptionProps } from "./type";

export function Option({ 
  value,
  children
}:OptionProps):JSX.Element {
  return (
    <option value={value}>{children}</option>
  )
}