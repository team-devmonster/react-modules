import { forwardRef, Ref } from 'react';
import { Button, Div, P, TagElement, TagStyle, useTags } from '@team-devmonster/react-tags';
import { A } from './a';
import { StatusBarStyle } from './type';

export interface HeaderProps {
  title?:string | TagElement;
  headerLeft?:TagElement;
  headerRight?:TagElement;
  headerBackTitle?:string;
  headerBackVisible?:boolean;
  headerTitleAlign?:"left" | "center" | undefined;
  headerTitleStyle?:Pick<TagStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  };
  headerShown?: boolean;
  style?: TagStyle;
  statusBarStyle?:StatusBarStyle;
  contentStyle?:TagStyle;
  children?:TagElement;
}
export const Header = forwardRef((
  { 
    title, 
    headerTitleAlign, 
    headerTitleStyle, 
    headerLeft, 
    headerRight, 
    headerBackTitle, 
    headerBackVisible = true,
    headerShown = true, 
    style, 
    statusBarStyle, 
    contentStyle,
    children
  }:HeaderProps,
  ref:Ref<HTMLDivElement>
  ) => {

  const { tagConfig } = useTags();
  const headerTagStyle = tagConfig?.header?.style;
  const headerTagTitleStyle = tagConfig?.header?.headerTitleStyle;


  if(!headerShown) return null;
  return (
    <Div 
      ref={ref}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%'
      }}>
      <Div style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        minHeight: 56,
        backgroundColor: '#ffffff',
        zIndex: 100
      }}>
        <Div 
          style={{
            position: 'relative',
            flexDirection: 'row',
            zIndex: 2,
          }}>
          {
            headerLeft ?
              headerLeft
            :
              headerBackVisible
              ?
                <A back={true}>
                  <Button fill="none" color={headerTagStyle?.backgroundColor || style?.backgroundColor}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={24} height={24} strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </Button>
                </A>
              :
                null
          }
        </Div>
        <P style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          zIndex: 1,
          ...(headerTagStyle?.color ? {color: headerTagStyle.color} : null),
          ...(style?.color ? {color: style.color} : null),
          ...headerTagStyle,
          ...style,
          ...headerTagTitleStyle,
          ...headerTitleStyle
        }}>{title}</P>
        <Div
          style={{
            position: 'relative',
            flexDirection: 'row',
            zIndex: 2
          }}>
          {headerRight}
        </Div>
      </Div>
      {children}
    </Div>
  )
})
Header.displayName = 'Header';