import { useEffect, useState } from "react"
import { ModalPortal } from "./portal"

export type ModalProps = {
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
    <ModalPortal>
      { visible ? children : null }
    </ModalPortal>
  )
}