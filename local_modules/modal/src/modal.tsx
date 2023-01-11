import { useEffect, useState } from "react"
import { Portal } from "./portal"

export type ModalProps = {
  animationType?:any,
  visible?:boolean,
  onRequestClose?:(e?:any) => void,
  children?:any
}
export const Modal = ({ visible = true, onRequestClose, children }:ModalProps) => {

  const [prevVisible, setPrevVisible] = useState(visible);

  useEffect(() => {
    if(prevVisible && !visible) {
      onRequestClose?.();
    }
    setPrevVisible(visible);
  }, [visible]);

  return (
    Portal ?
      <Portal>
        { visible ? children : null }
      </Portal>
    : null
  )
}