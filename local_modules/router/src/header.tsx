/* import Link from "next/link";
import React from "react";
import { Url, UrlObject } from "url";

interface HeaderProps {
  title?:string | (() => React.ReactNode);
  headerLeft?:React.ReactNode;
  headerRight?:React.ReactNode;
  headerBackTitle?:string;
  headerShown?: boolean;
  children?: React.ReactNode;
  style?: TextStyle;
  statusBarStyle?:StatusBarStyle;
}

export const Header = ({ href, as, children }:Aprops) => {
  return (
    <Link 
      style={{
        display: 'contents',
        color: 'inherit',
        textDecoration: 'none'
      }}
      href={href} 
      as={as}>
      {children}
    </Link>
  )
} */