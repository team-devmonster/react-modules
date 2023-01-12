import React from "react";
import { useTheme } from "@local_modules/theme";
import { Div, Button, Img, P, Span, Br } from "@local_modules/tags";
import { Theme } from "App.theme";
import { Table } from "@local_modules/tags";
import { Thead } from "@local_modules/tags";
import { Tr } from "@local_modules/tags";
import { Th } from "@local_modules/tags";
import { Tbody } from "@local_modules/tags";
import { Td } from "@local_modules/tags";

const TagsEx = () => {

  const { color, fontSize, shadow, colorScheme } = useTheme<Theme>();

  //console.log(colorScheme);

  return (
    <Div
      style={{
        backgroundColor: color.backgroundColor, 
        flex: 1, 
        padding: 18 
      }}>
      <Div style={{ fontSize: fontSize.xl }}><Img alt="logo" src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img></Div>
      <Div style={{ fontSize: fontSize.xl }}><Img alt="logo" src="https://devmonster.co.kr/static/media/main-bg-05.d88f30e7.png"></Img></Div>
      <Div>
        <Button color={color.primary} onClick={() => alert('pressed')}>
          {`2. button => <Button></Button>`}
        </Button>
      </Div>
      <Div>
        <Img
          style={{
            width: '100%',
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
          color={color.primary} 
          style={{ display: 'inline-flex', height: 40 }}>inline button</Button>
        hello~!
      </P>
      <P style={{ marginBottom: 20, color: color.primary }}>
        hello?
        <Button color={color.step500}>not inline button. normal button.</Button>
      </P>
      <P>
        text with <Br/>hello
      </P>
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

      <Table>
        <Thead>
          <Tr style={{ display: 'flex', flexDirection: 'row' }}>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품번호</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>보관BOX</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>부품명</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>UNIT</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>WORK</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>STND</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최초잔량</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>RE-MAIN</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종DATE</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>최종 사용량</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>소모 / 수급량 정보 확인하기</Th>
            <Th style={{ backgroundColor: color.white, padding: 8, borderWidth: 1, borderColor: color.step200 }}>수정하기</Th>
          </Tr>
        </Thead>
        <Tbody>
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