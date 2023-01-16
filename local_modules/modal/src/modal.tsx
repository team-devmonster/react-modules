import { useEffect, useState } from "react"
import { ModalPortal } from "./portal"

export type ModalProps = {
  animationType?:any,
  visible?:boolean,
  onRequestClose?:(e?:any) => void,
  children?:any,
  style?:any
}
export const Modal = ({ visible = true, onRequestClose, children, style }:ModalProps) => {

  const [prevVisible, setPrevVisible] = useState(visible);

  useEffect(() => {
    if(prevVisible && !visible) {
      onRequestClose?.();
    }
    setPrevVisible(visible);
  }, [visible]);

  return (
    <ModalPortal>
      { visible ? 
        <div style={{ position: 'fixed', left: 0, top: 0, width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, ...style }}>
          { children }
        </div>
       : null }      
    </ModalPortal>
  )
}