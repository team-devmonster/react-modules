import { useMemo, useRef } from "react";
import { Div, TagElement, TagProps } from "@team-devmonster/react-tags";
import { Edge } from "./type";
import { Header } from "./header";

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges:_, style, ...rest }:LayoutProps) => {

  const headerRef = useRef<HTMLDivElement>(null);
  const { header, contents, fixedLayout, footer } = useMemo(() => newChildren({ children }), [children]);

  return (
    <Div 
      {...rest}
      style={style}>
      {
        header
        ?
          <Header ref={headerRef} {...header.props}></Header>
        :
          null
      }
      <Div style={{ paddingTop: header?.props?.style?.height || headerRef?.current?.offsetHeight, flex: 1 }}>
        {contents}
      </Div>
      {fixedLayout}
      {footer}
    </Div>
  )
}

const newChildren = ({ children }:{ children:TagElement })
  :{ 
    defaultEdges:Edge[], 
    header:JSX.Element|null,
    contents:TagElement, 
    fixedLayout:TagElement,
    footer:TagElement
  } => {
  if(!children) return { defaultEdges: ['top', 'left', 'right', 'bottom'], header:null, contents: null, fixedLayout: null, footer: null };

  const edges:Edge[] = ['left', 'right'];
  
  let header:JSX.Element|null = null;
  let contents:TagElement = [];
  let fixedLayout = null;
  let footer = null;

  if(Array.isArray(children)) {
    for(let i = 0; i < children.length; i++) {
      const child = children[i];
      if(Array.isArray(child)) {
        contents = children;
      }
      else if(child) {
        if(typeof child === 'string' || typeof child === 'number') {
          contents = children;
        }
        else {
          switch(child?.type?.displayName) {
            case 'Header':
              header = child;
              contents.push(child);
              break;
            case 'FixedLayout':
              fixedLayout = child;
              break;
            case 'Footer':
              footer = child;
              break;
            default:
              contents.push(child);
              break;
          }
        }
      }
      else {
        contents = children;
      }
    }
  }
  else {
    contents = children;
  }

  if(!header || header?.props?.headerShown === false) edges.push('top');
  if(!footer) edges.push('bottom');
  return {
    defaultEdges: edges, 
    header,
    contents,
    fixedLayout,
    footer
  }
}