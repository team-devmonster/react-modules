import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, P } from "@local_modules/tags";
import { A } from "@local_modules/router";
import { Layout } from "@local_modules/router";

const Index = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  return (
    <Layout style={{ backgroundColor: color.white }}>
        <Div style={{ padding: 20 }}>
          <P style={{ 
            fontSize: fontSize.x2l, 
            marginBottom: 20 
            }}>Devmonster's react-native-modules!!</P>
          <Div>
            <A href={'/themeEx'}>
              <Button 
                color={color.primary}
                style={{ marginBottom: 8 }}>
                react-native-theme
              </Button>
            </A>
            <A href={'/tagsEx'}>
              <Button 
                color={color.primary}
                style={{ marginBottom: 8 }}>
                react-native-tags
              </Button>
            </A>
            <A href={'/routerEx'}>
              <Button 
                color={color.danger} 
                fill="outline" 
                style={{ ...shadow.base, marginBottom: 8 }}>
                react-native-router
              </Button>
            </A>
            <A href={'/formEx'}>
              <Button color={color.danger} fill="outline" style={{ ...shadow.base }}>
                react-native-form
              </Button>
            </A>
            {/* <A href={'/swiperEx'}>
              <Button color={color.danger} fill="outline" style={{ ...shadow.base }}>
                react-native-swiper
              </Button>
            </A> */}
          </Div>
        </Div>
    </Layout>
  )
}

export default Index;