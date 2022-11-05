import Link from "next/link";
import React from "react";
import { Url, UrlObject } from "url";
import { Button } from '@team-devmonster/react-tags';
import { useRouter } from "next/router";

export interface Aprops {
  href?: string | UrlObject,
  as?: Url,
  replace?:boolean,
  push?:boolean,
  back?:boolean,
  children?:React.ReactNode
}

export const A = ({ href, as, replace, push:_, back, children }:Aprops) => {

  const router = useRouter();

  return (
    back
    ?
      <Button tag="a" onClick={(e) => {e.preventDefault(); router.back();}}>
        {children}
      </Button>
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