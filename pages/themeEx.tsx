import React, { CSSProperties } from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <div 
      style={{ 
        backgroundColor: color.white, 
        flex: 1, 
        flexDirection: 'row', 
        paddingTop: 18, 
        paddingBottom: 18 
      }}>
      <div style={{ backgroundColor: color.primary, ...style.boxStyle }}>
        <div style={{ color: color.black, fontSize: fontSize.sm }}>primary</div>
      </div>
      <div style={{ backgroundColor: color.danger, ...style.boxStyle }}>
        <div style={{ color: color.black, fontSize: fontSize.sm }}>danger</div>
      </div>
    </div>
  )
}

const style = {
  boxStyle: {
    width: 80, 
    height: 80, 
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center'
  } as CSSProperties
}

export default ThemeEx;