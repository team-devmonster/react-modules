import React, { createContext, CSSProperties, HTMLAttributes, useContext } from "react";
import { ButtonProps } from "./button";

export interface TagGroupConfig {
  div?: TagStyle,
  button?: ButtonProps,
  input?: TagStyle,
  img?: TagStyle,

  //additional
  p?:TagStyle,
  span?:TagStyle
}

export interface TagProps extends Omit<HTMLAttributes<HTMLElement>, 'style'|'onClick'> {
  style?:TagStyle
}
export interface TagStyle extends Omit<CSSProperties, 'display'|'border'|'fontSize'|'backgroundImage'|'background'|'cursor'> {
  display?: 'flex' | 'inline-flex' | 'none',
  fontSize?:number
}
export interface ButtonStyle extends TagStyle {
  cursor?:string
}

const TagContext = createContext<{ tagConfig?:TagGroupConfig }>({});

export function TagProvider({children, tagConfig}:{children:React.ReactNode, tagConfig?:TagGroupConfig}) {

  //useFonts

  return (
    <TagContext.Provider value={{ tagConfig }}>
      {children}
    </TagContext.Provider>
  )
}

export function useTags() {
  return useContext(TagContext);
}

/* const objectFilter = (obj:Object, callback:({key, value}:{key:string, value:any}) => void) => {
  const entries = Object.entries(obj);
  return Object.fromEntries(entries.filter(([key, value]) => callback({ key, value })));
} */