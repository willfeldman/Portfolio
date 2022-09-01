import { CgArrowsExpandRight } from "react-icons/cg";
import "./Expand.scss";

export default function Expand(props) {
  return (
    <div className="expand">
      <button
        onClick={props.onClick}
        style={{ width: props.size, height: props.size }}
        aria-label="Expand"
      >
        <CgArrowsExpandRight />
      </button>
    </div>
  );
}
