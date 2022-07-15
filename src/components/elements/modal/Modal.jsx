import { Dialog } from "@reach/dialog";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
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
        <button onClick={close}>
          <IoClose />
        </button>
      </div>
    </Dialog>
  );
}

export default Modal;
