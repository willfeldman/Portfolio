import { Dialog } from "@reach/dialog";
import { useNavigate } from "react-router-dom";
import "./Modal.scss";
import { mode } from "../../../data/darkmode";
import BarClose from "../button/bar/close/BarClose";
import Close from "../button/close/Close";

function Modal(props) {
  let navigate = useNavigate();

  function close() {
    navigate(-1);
  }

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={close}
      className={`${mode}-mode`}
    >
      <div className="close-modal-button">
        <div className="button-bar">
          <BarClose onClick={close} />
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
