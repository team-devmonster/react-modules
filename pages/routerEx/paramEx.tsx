import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, P } from "@local_modules/tags";
import { Theme } from "App.theme";
import { A, Layout } from "@local_modules/router";
import { useRouter } from "next/router";
import { Header } from "@local_modules/router";

const ParamEx = () => {

  const { color, fontSize, shadow, colorScheme } = useTheme<Theme>();
  const { query } = useRouter();

  //console.log(colorScheme);

  return (
    <Layout
      style={{
        backgroundColor: color.backgroundColor,
        flex: 1,
        padding: 18
      }}>
      <Header
        style={{
          backgroundColor: color.primary,
          color: 'red'
        }}
        title="Hello Params"
      />
      <P style={{ padding: 8, backgroundColor: color.step300 }}>
        { query.name as string } / { query.nickname as string } / { query.company as string }
      </P>
      <A back={true}>
        <Button color={color.primary}>Back</Button>
      </A>
    </Layout>
  )
}

export default ParamEx;