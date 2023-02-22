import { HTMLAttributes, CSSProperties } from "react"


export type ColorSchemeName = 'light'|'dark'|undefined;
export type OnLayoutEvent = {
  nativeEvent: {
    layout:LayoutEvent
  }
};
export type LayoutEvent = { width:number, height:number, x:number, y:number };

export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'borderTop'|'borderBottom'|'borderRight'|'borderLeft'|'fontSize'|'backgroundImage'|'background'|'cursor'|'lineHeight'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number,
  lineHeight?:number,
  borderRadius?:number,
  placeholderColor?:string,
  icon?:TagElement,
  iconColor?:string
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
  // tag - table
  table?:TagConfig,
  thead?:TagConfig,
  tbody?:TagConfig,
  tr?:TagConfig,
  th?:TagConfig,
  td?:TagConfig,
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
  style?:TagStyle,
  hoverStyle?:TagStyle,
}

export type EllipsizeModeType = "head" | "tail" | "middle" | "clip";
export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'style'|'onClick'> {
  tag?:string,
  childTag?:string,
  children?:TagElement,
  style?:TagStyle,
  hoverStyle?:TagStyle,
  numberOfLines?:number,
  ellipsizeMode?:EllipsizeModeType,
  onLayout?:(e:OnLayoutEvent) => void
}
export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export type TagElement = JSX.Element|string|number|null|undefined|TagElement[];

// tags props
export interface ButtonProps extends TagProps {
  tag?: 'div'|'button'|'a';
  animated?:boolean;
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
  animated?:boolean;
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
  'type=datetime-local'?:InputDateConfig,
  'type=time'?:InputDateConfig,
  'type=file'?:InputFileConfig,
}

export interface InputCheckboxConfig {
  style?:InputCheckboxStyle,
  checkedStyle?:InputCheckboxStyle,
  disabledStyle?:InputCheckboxStyle,
  errorStyle?:InputCheckboxStyle
}
export interface InputRadioConfig {
  style?:InputRadioStyle,
  checkedStyle?:InputRadioStyle,
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
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputRadioStyle extends TagStyle {
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}
export interface InputDateStyle extends TagStyle {
  icon?:TagElement,
  iconColor?:string,
  iconWidth?:number,
  iconHeight?:number
}

export interface SelectStyle extends InputStyle {
  icon?:TagElement,
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