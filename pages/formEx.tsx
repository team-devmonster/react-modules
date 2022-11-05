import { Button } from "@local_modules/tags";
import React, { useEffect, useState } from "react";

const FormEx = () => {

  // 나중에 시간 좀 있을 때 해봐야지.
  /* const {formControl} = useForm({
    prop1: 'hello1',
    prop2: 'hello2'
  });

  return (
    <div>
      <input {...formControl?.prop1}></input>
      <input {...formControl?.prop2}></input>
      <Button onClick={() => console.log(formControl)}>hello</Button>
    </div>
  ) */
}

export default FormEx;

const Input = () => {
  return (
    <input/>
  )
}

// 시간많을 때 해봐야겠다.
/* const useForm = (defaultForm:any) => {
  const [form, setForm] = useState(defaultForm);
  const [formControl, setFormControl] = useState<any>();

  useEffect(() => {
    const entries = Object.entries(form);
    const control:any = {};
    entries.forEach(([key, value]) => {
      control[key] = {
        name: key,
        value,
        onChange: (e:any) => {
          const value = e?.target?.value;
          setFormControl((prev:any) => ({...prev, [key]: { ...prev[key], value } }));
        }
      }
    });
    setFormControl(control);
  }, [form])
  console.log(setFormControl);
  
  return {
    formControl
  }
} */