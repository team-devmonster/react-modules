import { HTMLAttributes, CSSProperties } from "react"


export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'fontSize'|'backgroundImage'|'background'|'cursor'|'lineHeight'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number,
  lineHeight?:number,
  borderRadius?:number
}
export interface TagGroupConfig {
  div?: TagStyle,
  button?: ButtonConfig,
  img?: TagStyle,
  //additional
  p?:TagStyle,
  span?:TagStyle,
  // router
  header?:HeaderConfig,
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
export interface ButtonStyle extends TagStyle {
  cursor?:string
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

// router
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