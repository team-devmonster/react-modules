import React from "react";
import Link from "next/link";
import { Url, UrlObject } from "url";
import { useRouter } from "next/router";

export interface Aprops {
  href?: string | UrlObject,
  as?: Url,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  reset?:boolean,
  children?:React.ReactNode,
  target?:string
}

const urlPattern = /^(mailTo:|tel:|http:|https:)/;
export const A = ({ href, as, replace, push:_, back, reset:__, children, target }:Aprops):JSX.Element => {

  const router = useRouter();
  const page = navigate({ href });
  

  return (
    back
    ?
      <a
        style={{
          display: 'contents',
          color: 'inherit',
          textDecoration: 'none',
        }}
        onClick={(e) => {e.preventDefault(); router.back();}}>
          {children}
        </a>
    :
      urlPattern.test(page)
      ?
        <a 
          style={{
            display: 'contents',
            color: 'inherit',
            textDecoration: 'none',
          }}
          href={page}
          target={target}>
          {children}
        </a>
      :
        <Link
          style={{
            display: 'contents',
            color: 'inherit',
            textDecoration: 'none',
          }}
          href={href!}
          as={as}
          replace={replace}>
          {children}
        </Link>
  )
}


interface navigateProps {
  href?: string | UrlObject,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  reset?:boolean,
}
const navigate = ({ href }:navigateProps) => {
  if(!href) return '';

  let page = '';

  if(typeof href === 'string') {
    page = href;
  }
  else {
    if(!href.pathname) return '';
    page = href.pathname;
  }
  return page;
}