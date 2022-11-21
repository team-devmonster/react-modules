import { useEffect, useState } from "react";
import { Div, TagProps, useTagStyle } from "@team-devmonster/react-tags";
import { Edge } from "./type";
import { Header } from "./header";

interface LayoutProps extends TagProps {
  edges?:Edge[];
}
export const Layout = ({ children, edges:_, style, ...rest }:LayoutProps) => {
  
  const [header, setHeader] = useState<any>(null);
  const [contents, setContents] = useState<any|any[]>(null);

  const [headerState, setHeaderState] = useState<HTMLDivElement|null>(null);
  const [offset, setOffset] = useState({ top: 0, bottom: 0 });

  useEffect(() => {
    if(!children) return;
    else if(Array.isArray(children)) {
      const contents = [...children];
      const headerIndex = contents.findIndex(child => {
        return child.type?.displayName === 'Header';
      });
      if(headerIndex > -1) {
        const header = contents.splice(headerIndex, 1);
        setHeader(header[0]);
        setContents(contents);
      }
      else {
        setHeader(null);
        setContents(contents);
      }
    }
    else {
      setContents(children);
    }
  }, [children]);

  useEffect(() => {
    console.log(headerState);
    if(headerState?.offsetHeight) {
      //const { height } = headerState.getBoundingClientRect();
      console.log(headerState.offsetHeight);
      setOffset({ top: headerState.offsetHeight, bottom: 0 });
    }
    else {
      setOffset({ top: 0, bottom: 0 });
    }
  }, [headerState?.offsetHeight])

  const [newStyle] = useTagStyle([], [style]);

  return (
    <Div 
      style={{
        ...newStyle
      }}>
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