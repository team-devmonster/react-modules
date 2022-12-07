import { HTMLAttributes, CSSProperties } from "react"


export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'borderTop'|'borderBottom'|'borderRight'|'borderLeft'|'fontSize'|'backgroundImage'|'background'|'cursor'|'lineHeight'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number,
  lineHeight?:number,
  borderRadius?:number
}
export interface TagGroupConfig {
  // tag - default
  div?: TagStyle,
  button?: ButtonConfig,
  img?: TagStyle,
  // tag - additional
  p?:TagStyle,
  span?:TagStyle,
  // router
  layout?:LayoutConfig,
  header?:HeaderConfig,
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
  checkbox?: InputConfig,
  radio?: InputConfig
}

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'style'|'onClick'> {
  children?:TagElement|TagElement[],
  style?:TagStyle,
  hoverStyle?:TagStyle,
}
export interface ButtonStyle extends TagStyle {
  cursor?:string
}
export type TagElement = JSX.Element|JSX.Element[]|string|number|null|undefined;

// tags
export type FillProps = 'base' | 'outline' | 'translucent' | 'none';
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
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
  errorStyle?:InputStyle
}

export interface ErrorTextConfig {
  style?:TagStyle
}

export interface LabelConfig {
  style?:TagStyle,
  disabledStyle?:TagStyle,
  errorStyle?:TagStyle
}