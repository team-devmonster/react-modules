import React, { Children, createContext, useContext, useMemo } from "react";
import { TagStyle, TagProps, TagGroupConfig, TagElement } from "./type";


const TagContext = createContext<{ tagConfig?:TagGroupConfig }>({});

export function TagProvider({children, tagConfig}:{children:React.ReactNode, tagConfig?:TagGroupConfig}) {

  return (
    <TagContext.Provider value={{ tagConfig }}>
      {children}
    </TagContext.Provider>
  )
}

export function useTags() {
  return useContext(TagContext);
}

export const textPattern = /^(color|font|text|lineHeight|whiteSpace)/;
export const layoutPattern = /^(display|width|minWidth|maxWidth|height|minHeight|maxHeight|position|top|left|right|bottom|opacity|overflow|alignSelf|justifySelf|aspectRatio)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;
export const placeholderPattern = /^(placeholder)/;
export const gapPattern = /(gap|Gap)/;
export const iconPattern = /(^icon)/;

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

export const TagModule = (props:TagProps) => {
  return <TagChildren {...props}/>
}
const TagChildren = ({ children:rawChildren, ...rest }:{ children?:TagElement, style?:TagStyle, tag?:string, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip" }) => {
  let textChildren:(JSX.Element|string)[] = [];
  const children = Children.toArray(rawChildren) as TagElement[];
  const newChildren = Children.map(children, (child, index) => {
    if(!child) return null;
    if(Array.isArray(child)) return child;

    if(typeof child === 'string' || typeof child === 'number' 
    || child.type?.displayName === 'Br' || child.type?.displayName === 'Span') {
      textChildren.push(typeof child === 'number' ? String(child) : child);

      if(index < children.length - 1) {
        return null;
      }

      const cloneTextChildren = [...textChildren];
      textChildren = [];
      return <GroupText textChildren={cloneTextChildren} {...rest}/>;
    }

    if(child.props?.style?.display === 'inline-flex') {
      
      const cloneTextChildren = [...textChildren];
      textChildren = [];
      return (
        <>
          <GroupText textChildren={cloneTextChildren} {...rest}/>
          { React.cloneElement(child, { style: { ...child.props.style, display: 'flex' } }) }
        </>
      )
    }

    const cloneTextChildren = [...textChildren];
    textChildren = [];
    return (
      <>
        <GroupText textChildren={cloneTextChildren} {...rest}/>
        <GapView child={child}/>
      </>
    )
    
  })
  return (
    <>
      {newChildren}
    </>
  )
}

const GapView = ({ child }:{ child:JSX.Element }) => {  
  return child;
}

const GroupText = ({ tag, textChildren, style, numberOfLines, ellipsizeMode:_ }:{ tag?:any, textChildren:TagElement[], style?:TagStyle, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip" }) => {
  if(!textChildren.length) {
    return null;
  }
  
  return (
    <Text
      tag={tag}
      style={{
        lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
        ...style
      }}
      ellipsizeMode="tail"
      numberOfLines={numberOfLines}
    >{textChildren}</Text>
  )
}

const Text = ({tag, style, children, numberOfLines, ellipsizeMode}:TagProps) => {
  const Tag:any = tag || 'p';

  const fontSize = useMemo(() =>  style?.fontSize || 14, [style?.fontSize])
  const lineHeight = useMemo(() => typeof style?.lineHeight == 'number' && fontSize ? style.lineHeight/fontSize : 1.28, [style?.lineHeight, fontSize])

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

    if(numberOfLines) {
      return {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: numberOfLines,
        WebkitBoxOrient: 'vertical'
      }
    }

    return null;
  }, [numberOfLines, ellipsizeMode]);

  return (
    <Tag style={{
      whiteSpace: 'pre-line',
      ...lineClamp,
      ...style,
      fontSize,
      lineHeight
    }}>{children}</Tag>
  );
}





// 예전 코드. 절대 삭제 금지. 삭제하면 나 울음
/* if(Array.isArray(children)) {
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
            <Text key={`tag_${i}`} tag={tag} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{[...textchildren]}</Text>
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
      <Text key={`tag_${children.length}`} tag={tag} style={style} numberOfLines={numberOfLines} ellipsizeMode={ellipsizeMode}>{[...textchildren]}</Text>
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
} */