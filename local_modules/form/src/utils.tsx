import { ColorSchemeName, TagStyle } from '@team-devmonster/react-tags';
import { KeyboardEventHandler } from 'react';

export const textColor = ({ colorScheme }:{ colorScheme:ColorSchemeName }) => colorScheme === 'dark' ? '#ffffff' : '#1f1f1f';

export const getIcon = ({ iconObj }:{ iconObj:any }) => {
  let icon:JSX.Element|null = null;
  let iconStyle:TagStyle = {};

  if(!iconObj || !iconObj.icon) return { icon, iconStyle };


  if(iconObj.icon.type) {
    icon = iconObj.icon;
  }
  else {
    iconStyle = iconObj.icon;
  }
  return {
    icon, iconStyle
  }
}

export const formStyles = {
  dummyInput: {
    position: 'absolute', 
    top: -2, 
    left: 0, 
    width: 1, 
    height: 1, 
    zIndex: -1, 
    opacity: 0,
    PointerEvent: 'none'
  } as any
}

export const onEnterEvent = (e:React.KeyboardEvent<HTMLTextAreaElement|HTMLInputElement>, onEnter?:KeyboardEventHandler<HTMLInputElement>) => {
  if(e.key === 'Enter' && !e.shiftKey) onEnter?.(e as any);
}