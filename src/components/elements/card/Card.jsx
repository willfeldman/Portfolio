import "./Card.scss";
import Expand from "../expand/Expand";

export default function Card(props) {
  return (
    <div className="card" onClick={props.action}>
      <div className="expandCardButton">
        <Expand size="30px" />
      </div>
      {props.children}
    </div>
  );
}
