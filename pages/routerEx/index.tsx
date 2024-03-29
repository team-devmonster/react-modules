import React from "react";
import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { A, Div, Button, Img } from "@local_modules/tags";
import { Header, Layout, Footer, FixedLayout } from "@local_modules/router";

import ImgBell from "@image/header/bell.svg";
import ImgBellDark from "@image/header/bell-dark.svg";
import ImgSetting from "@image/header/setting.svg";
import ImgSettingDark from "@image/header/setting-dark.svg";
import { useRouter } from "next/router";
import Head from "next/head";

const RouterEx = () => {

  const { color, colorScheme } = useTheme<Theme>();
  const router = useRouter();
  const pageHandle = (url: string) => {
    router.push(url);
  }

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
        <Head>
          <title>Devmonster: router</title>
        </Head>
        <Header
          headerLeft={<Img style={{ width: 150 }} alt="devmonster" src="https://devmonster.co.kr/static/media/logo-white.bd1e1be9.svg"></Img>}
          title="Title"
          //style={{ backgroundColor: tm.color.white }}
          headerRight={
            <Div style={{ flexDirection: 'row' }}>
              <Button onClick={() => pageHandle('/event')} style={{ justifyContent: 'center', marginRight: 8, padding: 0, width: 30, height: 30, backgroundColor: 'transparent' }}>
                {
                  colorScheme === 'dark'
                  ?
                    <ImgBellDark width={26} height={26}></ImgBellDark>
                  :
                    <ImgBell width={26} height={26}></ImgBell>
                }
              </Button>

              <Button onClick={() => pageHandle('/mypage/main')} style={{ justifyContent: 'center', padding: 0, width: 30, height: 30, backgroundColor: 'transparent' }}>
                {
                  colorScheme === 'dark'
                  ?
                    <ImgSettingDark width={26} height={26}></ImgSettingDark>
                  :
                    <ImgSetting width={26} height={26}></ImgSetting>
                }
              </Button>
            </Div>
          }
          ></Header>

        <FixedLayout>
          <Button style={{ bottom: 100, right: 100 }}>hover button</Button>
        </FixedLayout>
        
        <Div>
          <A href='/themeEx'>
            <Button color={color.primary} style={{ marginBottom: 8 }}>themeEx</Button>
          </A>
          <A href={{
            pathname: '/routerEx/paramEx',
            query: {
              name: 'soohong kim',
              nickname: 'aldegad',
              company: 'devmonster'
            }
          }}>
            <Button color={color.danger} style={{ marginBottom: 8 }}>paramEx</Button>
          </A>
          <A href='https://www.google.co.kr'>
            <Button color={color.warning} style={{ marginBottom: 8 }}>google</Button>
          </A>
          <A href='https://www.google.co.kr' target="blank">
            <Button color={color.warning}>google target blank</Button>
          </A>
        </Div>

        <Footer>
          <Button>tabs1</Button>
          <Button>tabs2</Button>
        </Footer>
    </Layout>
  )
}

export default RouterEx;