import { HTMLAttributes, CSSProperties } from "react"


export type ColorSchemeName = 'light'|'dark'|undefined;
export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'borderTop'|'borderBottom'|'borderRight'|'borderLeft'|'fontSize'|'backgroundImage'|'background'|'cursor'|'lineHeight'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number,
  lineHeight?:number,
  borderRadius?:number,
  placeholderColor?:string
}
export interface TagGroupConfig {
  // tag - default
  div?: TagConfig,
  button?: ButtonConfig,
  img?: TagConfig,
  // tag - additional
  h1?:TagConfig,
  h2?:TagConfig,
  h3?:TagConfig,
  p?:TagConfig,
  span?:TagConfig,
  dl?:TagConfig,
  dt?:TagConfig,
  dd?:TagConfig,
  main?:TagConfig,
  // router
  layout?:TagConfig,
  header?:HeaderConfig,
  footer?:TagConfig,
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
  select?: SelectConfig
}
export interface TagConfig {
  style?:TagStyle
}

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'style'|'onClick'> {
  children?:TagElement,
  style?:TagStyle,
  hoverStyle?:TagStyle,
}
export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export type TagElement = JSX.Element|string|number|null|undefined|TagElement[];

// tags props
export interface ButtonProps {
  tag?: 'div'|'button'|'a';
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  onClick?: ((event: any) => void) | null | undefined;
  disabled?:boolean;
  children?:TagElement
}

// tags config
export type FillProps = 'base' | 'outline' | 'translucent' | 'clear' | 'none';
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
  'fill=base'?:ButtonFillConfig;
  'fill=outline'?:ButtonFillConfig;
  'fill=translucent'?:ButtonFillConfig;
  'fill=clear'?:ButtonFillConfig;
  'fill=none'?:ButtonFillConfig;
}
interface ButtonFillConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  activeStyle?:ButtonStyle;
  color?: string;
}

// router
export interface LayoutConfig {
  style?: TagStyle
}
export interface HeaderConfig {
  style?: TagStyle,
  headerTitleStyle?:Pick<TagStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  }
}

// forms
export interface InputStyle extends TagStyle {
  placeholderColor?:string
}
export interface InputConfig {
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle,
  'type=checkbox'?:InputCheckboxConfig,
  'type=radio'?:InputRadioConfig,
  'type=date'?:InputDateConfig,
  'type=month'?:InputDateConfig,
  'type=time'?:InputDateConfig,
  'type=file'?:InputFileConfig,
}

export interface InputCheckboxConfig {
  style?:InputCheckboxStyle,
  disabledStyle?:InputCheckboxStyle,
  errorStyle?:InputCheckboxStyle
}
export interface InputRadioConfig {
  style?:InputRadioStyle,
  disabledStyle?:InputRadioStyle,
  errorStyle?:InputRadioStyle
}
export interface InputDateConfig {
  confirmText?:string,
  cancelText?:string,
  style?:InputDateStyle,
  disabledStyle?:InputDateStyle,
  errorStyle?:InputDateStyle
}
export interface InputFileConfig {
  cameraText?:string,
  albumText?:string,
  cancelText?:string,
  style?:InputStyle,
  disabledStyle?:InputStyle,
  errorStyle?:InputStyle,
  cameraButtonStyle?:ButtonStyle,
  albumButtonStyle?:ButtonStyle,
  cancelButtonStyle?:ButtonStyle
}
export interface SelectConfig {
  confirmText?:string,
  cancelText?:string,
  style?:SelectStyle,
  disabledStyle?:SelectStyle,
  errorStyle?:SelectStyle,
  confirmButtonStyle?:ButtonStyle,
  cancelButtonStyle?:ButtonStyle
}
export interface InputCheckboxStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputRadioStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputDateStyle extends TagStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}

export interface SelectStyle extends InputStyle {
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface ErrorTextConfig {
  style?:TagStyle
}

export interface LabelConfig {
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}