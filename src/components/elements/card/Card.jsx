import "./Card.scss";
import { CgArrowsExpandRight } from "react-icons/cg";

export default function Card(props) {
  return (
    <div className="card" onClick={props.action}>
      <div className="expand">
        <button aria-label="Expand">
          <CgArrowsExpandRight />
        </button>
      </div>
      {props.children}
    </div>
  );
}
