import { HTMLAttributes, CSSProperties } from "react"

export interface TagGroupConfig {
  div?: TagStyle,
  button?: ButtonConfig,
  img?: TagStyle,
  //additional
  p?:TagStyle,
  span?:TagStyle,
  // forms
  input?: InputConfig
  errorText?: ErrorTextConfig,
  label?: LabelConfig,
  checkbox?: InputConfig,
  radio?: InputConfig
}

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'style'|'onClick'> {
  style?:TagStyle,
  hoverStyle?:TagStyle
}
export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'fontSize'|'backgroundImage'|'background'|'cursor'|'lineHeight'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number,
  lineHeight?:number
}
export interface ButtonStyle extends Omit<TagStyle, 'borderRadius'> {
  cursor?:string,
  borderRadius?:number
}

// tags
export type FillProps = 'base' | 'outline' | 'translucent' | 'none';
export interface ButtonConfig {
  style?: ButtonStyle;
  disabledStyle?:ButtonStyle;
  hoverStyle?:ButtonStyle;
  color?: string;
  fill?: FillProps;
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