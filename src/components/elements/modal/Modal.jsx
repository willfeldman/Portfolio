import { Dialog } from "@reach/dialog";
import { useNavigate } from "react-router-dom";
import Close from "../button/close/Close";
import "./Modal.scss";

function Modal(props) {
  let navigate = useNavigate();

  function close() {
    navigate(-1);
  }

  return (
    <Dialog aria-labelledby="label" onDismiss={close}>
      {props.children}
      <div className="close-modal-button">
        <Close onClick={close} />
      </div>
    </Dialog>
  );
}

export default Modal;
