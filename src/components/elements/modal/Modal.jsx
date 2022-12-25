import { Dialog } from "@reach/dialog";
import { useNavigate } from "react-router-dom";
import Close from "../button/close/Close";
import "./Modal.scss";

function Modal(props) {
  // sets mode to either 'night' or 'day' depending on the user's system preferences for modal
  const mode = (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day'); 

  let navigate = useNavigate();

  function close() {
    navigate(-1);
  }

  return (
    <Dialog aria-labelledby="label" onDismiss={close} className={`${mode}-mode`}>
      {props.children}
      <div className="close-modal-button">
        <Close onClick={close} />
      </div>
    </Dialog>
  );
}

export default Modal;
