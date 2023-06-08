import React, { useState } from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img, P, Span, Br, Table, Tbody, Td, Th, Thead, Tr, LinearGradient } from "@local_modules/tags";
import { Theme } from "App.theme";

const TagsEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const [test, setTest] = useState(false);

  return (
    <Div
      onLayout={(e) => {
        // console.log(e.nativeEvent.layout);
      }}
      style={{
        backgroundColor: color.backgroundColor, 
        flex: 1, 
        padding: 18 
      }}>
      <Div>
        <Button color={color.step900} onClick={() => alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
      <LinearGradient
        // Background Linear Gradient
        start={{ x: 0.5, y: 0 }} end={{ x: 1, y: 1 }}
        colors={['#4c669f', '#6a3119']}
        style={{ width: 400, height: 200 }}
      >hello</LinearGradient>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={{ width: 200, height: 200 }} colors={['#711BD9', '#FF7171']}></LinearGradient>
      <Div>
        <Img
          style={{
            width: 100,
            aspectRatio: 1.2, 
            backgroundColor: color.step500,
            objectFit: 'cover'
          }} 
          alt="logo"
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Div>
      <P style={{
        marginBottom: 24, 
        height: 80
        }}>
        hello P
        <Span style={{ color: color.danger }}>hello Span</Span>
        <Button
          onClick={() => {
            setTest(!test);
          }} 
          color={color.primary} 
          style={{ display: 'inline-flex', height: 40, fontSize: 10 }}>inline button</Button>
        hello~!
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <P numberOfLines={1}>
{`text with hello1
wefe
sdafsadf
asdsad
`}</P>
      <Button 
        color={color.primary}
        fill="outline"
        style={{ 
          alignSelf: 'stretch', 
          alignItems: 'center',
          fontSize: fontSize.sm,
          ...shadow.base,
          marginBottom: 18
        }}>
          hellohellohello omg~
          <Img
          style={{
            width: 20,
            aspectRatio: 1.774,
            backgroundColor: color.step500
          }}
          src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img>
      </Button>
      <Button color={color.primary} fill="outline" style={{ marginBottom: 8 }}>
        outline
      </Button>

      {
        [1,2,3,4,5].map((item) => (
          <Button key={item} color={color.primary} fill="translucent">
            translucent
          </Button>
        ))
      }

      <Button fill="none">
        none
      </Button>

      <Table>
        <Thead>
          <Tr onClick={() => alert('clicked')} style={{ display: 'flex', flexDirection: 'row', backgroundColor: color.white }}>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>
              <Div>
                부품번호
              </Div>
            </Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Th>
            <Th style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td onClick={() => alert('hello')} style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Td>
            <Td style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Td>
          </Tr>
        </Tbody>
      </Table>
    </Div>
  )
}

export default TagsEx;