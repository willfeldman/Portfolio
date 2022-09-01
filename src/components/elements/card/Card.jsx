import "./Card.scss";
import Expand from "../button/expand/Expand";

export default function Card(props) {
  function renderCardExpandableClass() {
    // renders the expand button class if needed
    if (props.expandable !== false) {
      return "expandable";
    }
  }

  function renderExpandButton() {
    // renders the expand button if it requested in the data
    if (props.expandable !== false) {
      return (
        <div className="expandCardButton">
          <Expand size="30px" />
        </div>
      );
    }
  }

  return (
    <div
      className={`card ${renderCardExpandableClass()} ${props.customClass}`}
      onClick={props.action}
    >
      {renderExpandButton()}
      {props.children}
    </div>
  );
}
