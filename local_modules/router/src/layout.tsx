import React, { forwardRef, LegacyRef, useEffect, useMemo, useState } from "react";
import { Div, TagElement, TagProps, useTags } from "@team-devmonster/react-tags";
import { Edge } from "./type";
import { Footer } from "./footer";

interface LayoutProps extends TagProps {
  edges?:Edge[];
  onScroll?:(e:any) => void;
  scrollEventThrottle?:number;
}
export const Layout = forwardRef(({ children, edges:_, style, ...rest }:LayoutProps, ref:LegacyRef<HTMLElement>) => {

  const [headerRef, setHeaderRef] = useState<HTMLDivElement|null>(null);
  const [footerRef, setFooterRef] = useState<HTMLDivElement|null>(null);
  const { header, contents, fixedLayout, footer } = useMemo(() => newChildren({ children }), [children]);
  const { tagConfig } = useTags();
  const layoutTagStyle = tagConfig?.layout?.style;
  const contentStyle = useMemo(() => ({ ...layoutTagStyle, ...style }), [layoutTagStyle, style]);

  useEffect(() => {
    const body = document.body;
    if(body) {
      body.style.backgroundColor = contentStyle.backgroundColor as string;
    }
  }, [style?.backgroundColor]);

  return (
    <Div 
      ref={ref as any}
      {...rest}
      style={{
        flex: 1,
        ...(style?.overflow === 'hidden' ? { height: '100vh' } : null),
        paddingTop: header?.props?.style?.height || headerRef?.offsetHeight,
        paddingBottom: header?.props?.style?.height || footerRef?.offsetHeight,
        ...header?.props?.contentStyle
      }}>
      {
        header ?
          React.cloneElement(header, {
            ref: (ref:any) => setHeaderRef(ref)
          })
        : null
      }
      <Div style={{ 
        flex: 1, 
        ...contentStyle,
        ...style,
      }}>
        {contents}
      </Div>
      {fixedLayout}
      {
        footer
        ?
          <Footer ref={ref => setFooterRef(ref)} {...footer.props}/>
        : null
      }
    </Div>
  )
})

const newChildren = ({ children }:{ children:TagElement })
  :{ 
    defaultEdges:Edge[], 
    header:JSX.Element|null,
    contents:TagElement, 
    fixedLayout:TagElement,
    footer:JSX.Element|null
  } => {
  if(!children) return { defaultEdges: ['top', 'left', 'right', 'bottom'], header:null, contents: null, fixedLayout: null, footer: null };

  const edges:Edge[] = ['left', 'right'];
  
  let header:JSX.Element|null = null;
  let contents:TagElement = [];
  let fixedLayout:TagElement = [];
  let footer:JSX.Element|null = null;

  if(Array.isArray(children)) {
    for(let i = 0; i < children.length; i++) {
      const child = children[i];
      if(!child) {
        contents.push(child);
        continue;
      }
      if(Array.isArray(child)) {
        contents.push(child);
        continue;
      }
      
      // not array
      if(typeof child === 'string' || typeof child === 'number') {
        contents.push(child);
        continue;
      }
      
      switch(child?.type?.displayName) {
        case 'Header':
          header = child;
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