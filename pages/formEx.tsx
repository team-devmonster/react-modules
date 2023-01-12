import React from "react";
import { useForm } from "react-hook-form";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div } from "@local_modules/tags";
import { Layout } from "@local_modules/router";
import { ErrorText, Input, Label, Select, Textarea, Option } from "@local_modules/form";

interface FormProps {
  id:string, 
  password:string,
  phone:string,
  price:number,
  agree1:boolean,
  gender:'man'|'woman'|'etc',
  date:string,
  dateTime:string,
  time:string,
  company:string,
  file:any,
  longText:string
}

const FormEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  const { control, handleSubmit, formState: { errors }, setFocus, setValue, watch } = useForm<FormProps>({
    mode: 'onChange',
    defaultValues: {
      id: 'hello',
      gender: 'man'
    }
  });

  const onSubmit = (form:FormProps) => {
    console.log(form);
  }

  return (
    <Layout style={{ padding: 20, backgroundColor: color.white }}>
      <Div style={{ rowGap: 8 }}>
        <Input
          control={control}
          name="id"
          maxLength={{ value: 10, message: 'id <= 10' }}
          minLength={{ value: 5, message: 'id > 5' }}
          required="please insert id"></Input>
        <ErrorText errors={errors} name="id"></ErrorText>
        
        <Label errors={errors} name="password">password</Label>
        <Input 
          control={control} 
          name="password"
          type="password"
          placeholder="password"
          maxLength={{ value: 10, message: 'password <= 10' }} 
          required="please insert password"></Input>
        <ErrorText errors={errors} name="password"></ErrorText>

        <Label errors={errors} name="phone">phone</Label>
        <Input 
          control={control} 
          name="phone"
          type="tel"
          placeholder="phone"
          minLength={{ value: 11, message: 'phone more than 11' }}
          required={true}></Input>
        <ErrorText errors={errors} name="phone" message="hello"></ErrorText>

        <Input 
          control={control} 
          type="number"
          name="price"
          style={{ display: 'flex' }}
          max={{ value: 1000, message: 'price <= 1000' }}
          min={{ value: 11, message: 'price > 1' }}
          required="please insert price"></Input>
        <ErrorText errors={errors} name="price"></ErrorText>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }} 
          onClick={() => setValue('agree1', !watch('agree1'))}>
          <Input
            control={control}
            name="agree1"
            type="checkbox"
            required="place agree privacy usage"></Input>
          <Label style={{ flex: 1 }}>privacy usage</Label>
          <Button tag="a" color={color.primary} fill="outline">view</Button>
        </Button>
        <ErrorText errors={errors} name="agree1"></ErrorText>

        <Button 
          color={color.primary}
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'man')}>
          <Input
            control={control}
            name="gender"
            value="man"
            type="radio"></Input>
          <Label>man</Label>
        </Button>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'woman')}>
          <Input
            control={control}
            name="gender"
            value="woman"
            type="radio"></Input>
          <Label>woman</Label>
        </Button>

        <Button 
          fill="none"
          style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}
          onClick={() => setValue('gender', 'etc')}>
          <Input
            control={control}
            name="gender"
            value="etc"
            type="radio"></Input>
          <Label>etc</Label>
        </Button>
        
        <Input 
          type="date" 
          control={control}
          name="date"
          placeholder="date"></Input>

        {/* <Input 
          type="datetime-local" 
          control={control}
          name="dateTime"
          value="2022-11-27 22:49"
          placeholder="date time"></Input> */}

        <Textarea control={control} name="longText" placeholder="textarea"></Textarea>

        <Input 
          type="time" 
          control={control}
          name="time"
          placeholder="time"></Input>


        <Select 
          control={control}
          name="company"
          placeholder="please select">
          <Option value={1}>devmonster</Option>
          <Option value={2}>devmonster2</Option>
          {
            null
          }
        </Select>

        <Button
          onClick={() => {
            setFocus('price');
          }}>focus input</Button>
        <Button 
          onClick={() => {
            setFocus('agree1');
          }}>focus checkbox</Button>
        <Button 
          color={color.primary}
          onClick={handleSubmit(onSubmit)}>login</Button>
      </Div>
    </Layout>
  )
}

export default FormEx;