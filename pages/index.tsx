import React, { useState } from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
//import { Br, Button, Div, P } from "@local_modules/tags";
import { A, Button, Div, P } from "@local_modules/tags";
import { Layout } from "@local_modules/router";
import { Modal } from "@local_modules/modal";

const Index = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();
  const [visible, setVisible] = useState(false);

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
            <Button 
              color={color.step500}
              onClick={() => setVisible(true)}
              fill="clear">
              react-modal
            </Button>
            <Modal visible={visible} onRequestClose={() => console.log('on request close')}>
              <Div style={{
                position: 'absolute',
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10
              }}>
                hihihi
                <Button onClick={() => { setVisible(false) }}>close</Button>
              </Div>
            </Modal>
          </Div>
        </Div>
    </Layout>
  )
}

export default Index;