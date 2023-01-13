//import { useEffect, useState } from "react";
import reactDom from "react-dom";

export const ModalPortal = ({ children }:{ children:any }):React.ReactPortal|null => {
  if(typeof window === "undefined") return null;;

  const el = document.getElementById("devmonster-modal");
  if(el) {
    return reactDom.createPortal(children, el);
  }
  else {
    const modalEl = document.createElement('div');
    modalEl.id = 'devmonster-modal';
    document.body.append(modalEl);
    return reactDom.createPortal(children, modalEl);
  }
}