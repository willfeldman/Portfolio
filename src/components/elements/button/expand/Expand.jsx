import { CgArrowsExpandRight } from "react-icons/cg";
import "./Expand.scss";

export default function Expand(props) {

  // adds the box shadow if requested in data
  function addBoxShadow() {
    if (props.boxShadow) {
      return "expandShadow";
    }
  }

  return (
    <div className={`expand ${addBoxShadow()}`}>
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
