import { IoClose } from "react-icons/io5";
import "./Close.scss";

export default function Close(props) {
  return (
    <div className="closeButton">
      <button onClick={props.onClick}>
        <IoClose />
      </button>
    </div>
  );
}
