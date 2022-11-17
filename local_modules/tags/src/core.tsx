import { useState, useEffect } from "react";
import { TagStyle, TagProps } from "./type";

export const textPattern = /^(color|font|text|lineHeight)/;
export const layoutPattern = /^(flex|width|height)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;

export const flexDefaultStyle:TagStyle = {
  display: 'flex',
  flexDirection: 'column'
}
export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]) => {

  const [newStyles, setNewStyles] = useState<(TagStyle|{})[]>(new Array(patterns.length+1).fill(null).map(() => ({})));

  useEffect(() => {

    let styleObj:TagStyle = { borderStyle:'solid', borderWidth: 0 };
    styleStates.forEach(styleState => {
      styleObj = Object.assign(styleObj, styleState);
    })

    if(!patterns.length) {
      return setNewStyles([styleObj]);
    }

    const entries = Object.entries(styleObj) as [keyof TagStyle, any][];
    const styles:(any|null)[] = new Array(patterns.length+1).fill(null).map(() => ({}));

    for(let i = 0; i < entries.length; i++) {
      const key = entries[i][0];
      const value = entries[i][1];

      for(let j = 0; j < patterns.length; j++) {
        const pattern = patterns[j];
        const styleIndex = j;

        if(pattern.test(key)) {
          styles[styleIndex]![key] = value;
          break;
        }

        if(styleIndex === patterns.length-1) {
          styles[styles.length-1]![key] = value;
        }
      }

    }

    setNewStyles(styles);
  }, styleStates);

  return newStyles as TagStyle[];
}

export const useColorScheme = () => {

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

export const TagModule = ({ children, style:textStyle }:TagProps) => {

  const [newChildren, setNewChildren] = useState<React.ReactNode>(null);
  const [id] = useState(new Date().getTime());

  useEffect(() => {
    const newChildren = newChildrenFn();
    setNewChildren(newChildren);
  }, [children, textStyle]);

  const newChildrenFn = () => {
    if(!children) return null;
    if(typeof children === 'string' || typeof children === 'number') {
      return <Text style={textStyle}>{children}</Text>
    }
    else if(Array.isArray(children)) {
      const newChildren = [];
      const textchildren = [];
      for(let i = 0; i < children.length; i++) {
        const child = children[i];
        if(!child) {
          continue;
        }
        else if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(child);
        }
        else {
          if(child.type?.name === 'Span' || child.props?.style?.display === 'inline-flex') {
            textchildren.push(child);
          }
          else if(child.type?.name === 'Br') {
            textchildren.push(`\n`);
          }
          else {
            if(textchildren.length) {
              newChildren.push(
                <Text key={`tag_${id}_${newChildren.length}`} style={textStyle}>{[...textchildren]}</Text>
              );
              textchildren.length = 0;
            }
            newChildren.push(child);
          }
        }
      }
      // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
      if(textchildren.length) {
        newChildren.push(
          <Text key={`tag_${id}_${newChildren.length}`} style={textStyle}>{[...textchildren]}</Text>
        );
        textchildren.length = 0;
      }
      return newChildren;
    }
    else {
      return children;
    }
  }

  return newChildren as JSX.Element;
}

const Text = ({style, children}:{style?:TagStyle, children?:React.ReactNode}) => {
  return (
    <p style={{
      margin: 0,
      whiteSpace: 'pre-line',
      lineHeight: style?.fontSize ? 1.28 : undefined,
      ...style
    }}>{children}</p>
  )
}