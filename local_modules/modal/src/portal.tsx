import { useEffect, useState } from "react";
import reactDom from "react-dom";

export const Portal = ({ children }:{ children:any }) => {
  const el = getEl();
  if(el) {
    return reactDom.createPortal(children, el);
  }
  else {
    return null;
  }
}

const getEl = () => {

  const [el, setEl] = useState<HTMLElement|null>(null);
  useEffect(() => {
    const el = document.getElementById("modal");
    if(!el) {
      const modalEl = document.createElement('div');
      modalEl.id = 'modal';
      document.body.append(modalEl);
      setEl(modalEl);
    }
    setEl(el);
  }, []);

  return el;
}