import React, { CSSProperties } from "react";
import { contrastColor, darken, lighten, hexToRgb, useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";

const ThemeEx = () => {

  const { color, fontSize } = useTheme<Theme>();

  return (
    <div style={{ backgroundColor: color.white, flex: 1, padding: 20 }}>
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
      <div>
        <div style={{ color: color.black }}>2. color utils</div>
      </div>
      <div 
        style={{ 
          flexDirection: 'row', 
          paddingBottom: 18
        }}>
        <div style={{ backgroundColor: lighten(color.primary, 50), ...style.boxStyle }}>
          <div style={{ color: contrastColor(color.primary), fontSize: fontSize.sm }}>primary lighter 50</div>
        </div>
        <div style={{ backgroundColor: darken(color.danger, 50), ...style.boxStyle }}>
          <div style={{ color: contrastColor(color.danger), fontSize: fontSize.sm }}>danger darken 50</div>
        </div>
        <div style={{ backgroundColor: darken(color.step200, 50), ...style.boxStyle, width: style.boxStyle.width*2 }}>
          <div style={{ color: contrastColor(color.step200), fontSize: fontSize.sm }}>step200 hex:{color.step200} <br></br> rgb: {hexToRgb(color.step200)}</div>
        </div>
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
  }
}

export default ThemeEx;