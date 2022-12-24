import "./Card.scss";
import Expand from "../button/expand/Expand";

export default function Card(props) {
  function renderCardExpandableClass() {
    // renders the expand button class if needed
    if (props.expandable !== false) {
      return "expandable";
    }
  }

  function renderExpandStyling() {
    // has the expand button styling match card colors
    if (props.expandable !== false) {
      // only works if the expand button is requested

      let styling = {};

      // updates iconColor to match card background color if given
      if (props.backgroundColor) {
        styling.iconColor = props.backgroundColor;
      }

      // updates backgroundColor to match card text color if given
      if (props.textColor) {
        styling.backgroundColor = props.textColor;
      }

      return styling;
    }
  }

  function renderExpandButton() {
    // renders the expand button if it requested in the data
    if (props.expandable !== false) {
      return (
        <div className="expandCardButton">
          <Expand size="30px" customColors={renderExpandStyling()} />
        </div>
      );
    }
  }

  return (
    <div
      className={`card ${renderCardExpandableClass()} ${props.customClass}`}
      onClick={props.action}
      style={{ backgroundColor: props.backgroundColor, color: props.textColor }}
    >
      {renderExpandButton()}
      {props.children}
    </div>
  );
}
