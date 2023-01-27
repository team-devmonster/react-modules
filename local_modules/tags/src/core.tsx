import { useState, createContext, useContext, useEffect, useMemo } from "react";
import { TagStyle, TagProps, TagGroupConfig, TagElement, ColorSchemeName } from "./type";


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

export const textPattern = /^(color|font|text|lineHeight)/;
export const layoutPattern = /^(display|width|minWidth|maxWidth|height|minHeight|maxHeight|position|top|left|right|bottom|opacity|overflow|alignSelf|justifySelf)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;
export const placeholderPattern = /^(placeholder)/;

export const flexDefaultStyle:TagStyle = {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column'
}
export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]) => {

  const styles = useMemo(() => makeTagStyle({ patterns, styleStates }), styleStates);
  return styles;
}
const makeTagStyle = ({ patterns, styleStates }: { patterns:RegExp[], styleStates:(TagStyle|undefined)[] }):TagStyle[] => {
  // case 1
  let styleObj = {};
  styleStates.forEach(styleState => styleObj = Object.assign(styleObj, styleState));
  if(!patterns.length) return [styleObj];

  // case 2
  const entries = Object.entries(styleObj) as [keyof TagStyle, any][];
  const styles:TagStyle[] = new Array(patterns.length+1).fill(null).map(() => ({}));

  for(let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value = entries[i][1];

    for(let j = 0; j < patterns.length; j++) {
      const pattern = patterns[j];
      const styleIndex = j;

      if(pattern.test(key)) {
        (styles[styleIndex] as any)[key] = value;
        break;
      }

      if(styleIndex === patterns.length-1) {
        (styles[styles.length-1] as any)[key] = value;
      }
    }
  }
  return styles;
}

export const TagModule = ({ children, style, tag, numberOfLines, ellipsizeMode }:TagProps) => {

  const id = useMemo(() => String(new Date().getTime()), []);
  const tagChildren = useMemo(() => makeTagChildren({ id, children, style, tag, numberOfLines, ellipsizeMode }), [children, style, tag, numberOfLines, ellipsizeMode]);

  return tagChildren;
}
const makeTagChildren = ({ id, children, style, tag, numberOfLines, ellipsizeMode }:{ id:string, children?:TagElement, style?:TagStyle, tag?:string, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip" }) => {
  if(Array.isArray(children)) {
    const newChildren:TagElement[] = [];
    const textchildren:(JSX.Element|string)[] = [];
    children.forEach((child, i) => {
      if(Array.isArray(child)) {
        newChildren.push(child);
      }
      else if(child) {
        if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(String(child));
        }
        else if(child.type?.displayName === 'Br' || child.type?.displayName === 'Span' || child.props?.style?.display === 'inline-flex') {
          textchildren.push(child);
        }
        else {
          if(textchildren.length) {
            newChildren.push(
              <Text key={`tag_${id}_${i}`} tag={tag} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{[...textchildren]}</Text>
            )
            textchildren.length = 0;
          }

          newChildren.push(child);
        }
      }
      else {
        newChildren.push(child);
      }
    });
    
    // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
    if(textchildren.length) {
      newChildren.push(
        <Text key={`tag_${id}_${children.length}`} tag={tag} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{[...textchildren]}</Text>
      );
      textchildren.length = 0;
    }
    return newChildren;
  }
  else if(typeof children === 'string' || typeof children === 'number') {
    return <Text tag={tag} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{children}</Text>
  }
  else {
    return children;
  }
}

const Text = ({tag, style, children, numberOfLines, ellipsizeMode}:TagProps) => {

  const Tag:any = tag || 'p';

  const fontSize = useMemo(() =>  style?.fontSize || 14, [style?.fontSize])
  const lineHeight = useMemo(() => {
    if(typeof style?.lineHeight === 'number' && fontSize) {
      return style.lineHeight/fontSize;
    }
    else {
      return 1.28;
    }
  }, [fontSize, style?.lineHeight])

  const lineClamp = useMemo(() => {
    if(numberOfLines && ellipsizeMode) {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical'
      }
    }
    else return null;
  }, [numberOfLines, ellipsizeMode]);

  return (
    <Tag
      style={{
        whiteSpace: 'pre-line',
        lineHeight,
        ...lineClamp,
        ...style
      }}>{children}</Tag>
  )
}

export const useColorScheme = ():ColorSchemeName => {

  const [colorScheme, setColorScheme] = useState<'light'|'dark'>();

  useEffect(() => {
    const colorScheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setColorScheme(colorScheme);

    const fn = (event:MediaQueryListEvent) => {
      const newScheme = event.matches ? 'dark' : 'light';
      setColorScheme(newScheme);
    }
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', fn);
    
    return () => {
      window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', fn);
    }
  }, [])

  return colorScheme;
}