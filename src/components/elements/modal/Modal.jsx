import { Dialog } from "@reach/dialog";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./Modal.scss";
import { mode } from "../../../data/darkmode";
import BarClose from "../button/bar/close/BarClose";
import Close from "../button/close/Close";
import BarMinimize from "../button/bar/minimize/BarMinimize";
import BarExpand from "../button/bar/expand/BarExpand";

function Modal(props) {
  let navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
    return () => setIsOpen(false);
  }, []);

  function close() {
    setIsOpen(false);
    setTimeout(() => navigate(-1), 200);
  }

  function expand() {
    let modal = document.querySelector(".modal");
  
    if (!document.fullscreenElement) {
      modal.requestFullscreen().catch(err => {
        console.log(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
    }
  }

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={close}
      className={`${isOpen ? 'comeIn' : 'comeOut'} ${mode}-mode modal`}
    >
      <div className="close-modal-button">
        <div className="button-bar">
          <BarClose className="bar-close" onClick={close} />
          <BarMinimize className="bar-minimize" onClick={close} />
          <BarExpand className="bar-expand" onClick={expand} />
        </div>
        <div className="mobile-close">
          <Close onClick={close} />
        </div>
      </div>
      {props.children}
    </Dialog>
  );
}

export default Modal;
