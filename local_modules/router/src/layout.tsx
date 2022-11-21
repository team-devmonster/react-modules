import React, { useEffect, useState } from "react";
import { Div, TagProps } from "@team-devmonster/react-tags";
import { Edge } from "./type";
import { Header } from "./header";

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges:_, style, ...rest }:LayoutProps) => {
  
  //const [header, setHeader] = useState<any>(null);
  //const [contents, setContents] = useState<any|any[]>(null);

  const [headerState, setHeaderState] = useState<HTMLDivElement|null>(null);
  const [offset, setOffset] = useState({ top: 0, bottom: 0 });

  const { header, contents } = newChildren({ children });

  /* useEffect(() => {
    
  }, [children]); */

  useEffect(() => {
    if(headerState?.offsetHeight) {
      setOffset({ top: headerState.offsetHeight, bottom: 0 });
    }
    else {
      setOffset({ top: 0, bottom: 0 });
    }
  }, [headerState?.offsetHeight])

  return (
    <Div 
      {...rest}
      style={style}>
      {
        header
        ?
          <Header ref={ref => setHeaderState(ref)} {...header.props}></Header>
        :
          null
      }
      <Div style={{ paddingTop: offset.top, flex: 1 }}>
        {contents}
      </Div>
    </Div>
  )
}

const newChildren = ({ children }:{ children:React.ReactNode }):{header:React.ReactElement|null, contents:React.ReactNode} => {
  if(!children) return { header: null, contents: null };
  else if(Array.isArray(children)) {
    const contents = [...children];
    const headerIndex = contents.findIndex(child => {
      return child.type?.displayName === 'Header';
    });
    if(headerIndex > -1) {
      const header = contents.splice(headerIndex, 1);
      return { header: header[0], contents };
    }
    else {
      return { header: null, contents };
    }
  }
  else {
    return { header: null, contents: children };
  }
}