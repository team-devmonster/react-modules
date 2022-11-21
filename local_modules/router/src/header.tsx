import { Button, Div, P, TagStyle, useColorScheme } from '@team-devmonster/react-tags';
import { forwardRef, Ref } from 'react';
import { A } from './a';
import { StatusBarStyle } from './type';

export interface HeaderProps {
  title?:string | React.ReactNode;
  headerLeft?:React.ReactNode;
  headerRight?:React.ReactNode;
  headerBackTitle?:string;
  backButtonShown?:boolean;
  headerTitleAlign?:"left" | "center" | undefined;
  headerTitleStyle?:Pick<TagStyle, "fontFamily" | "fontSize" | "fontWeight"> & {
    color?: string | undefined;
  };
  headerShown?: boolean;
  style?: TagStyle;
  statusBarStyle?:StatusBarStyle;
  contentStyle?:TagStyle
}
const Header = forwardRef((
  { 
    title, 
    headerTitleAlign, 
    headerTitleStyle, 
    headerLeft, 
    headerRight, 
    headerBackTitle, 
    backButtonShown,
    headerShown = true, 
    style, 
    statusBarStyle, 
    contentStyle
  }:HeaderProps,
  ref:Ref<HTMLDivElement>
  ) => {

  const colorScheme = useColorScheme();


  if(!headerShown) return null;
  return (
    <Div 
      ref={ref}
      style={{ 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        width: '100%', 
        minHeight: 56,
        backgroundColor: colorScheme === 'dark' ? '#000000' : '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
        ...style
      }}>
      <Div 
        style={{
          position: 'relative',
          flexDirection: 'row',
          zIndex: 2,
        }}>
        {
          typeof backButtonShown === 'boolean' 
          ?
            backButtonShown
            ?
              <A back={true}>
                <Button fill="none" color={colorScheme === 'dark' ? '#000000' : '#ffffff'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={24} height={24} strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </Button>
              </A>
            :
              null
          : 
            headerLeft
            ?
              null
            :
              <A back={true}>
                <Button fill="none" color={colorScheme === 'dark' ? '#000000' : '#ffffff'}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width={24} height={24} strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </Button>
              </A>
        }
        {headerLeft}
      </Div>
      <P style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: colorScheme === 'dark' ? '#ffffff' : '#000000',
        zIndex: 1,
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
  )
})
Header.displayName = 'Header';
export { Header };