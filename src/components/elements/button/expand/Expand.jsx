import { CgArrowsExpandRight } from "react-icons/cg";
import "./Expand.scss";

export default function Expand(props) {
  // adds the box shadow if requested in data
  function addBoxShadow() {
    if (props.boxShadow) {
      return "expandShadow";
    }
  }

  // sets the default values
  let iconColor = "black";
  let backgroundColor = "white";

  if (props.customColors) {
    // updates iconColor in object if given
    if (props.customColors.iconColor) {
      iconColor = props.customColors.iconColor;
    }

    // updates backgroundColor in object if given
    if (props.customColors.backgroundColor) {
      backgroundColor = props.customColors.backgroundColor;
    }
  }

  // sets the styling object for the button
  const style = {
    width: props.size,
    height: props.size,
    backgroundColor: backgroundColor,
    color: iconColor
  };

  return (
    <div className={`expand ${addBoxShadow()}`}>
      <button
        onClick={props.onClick}
        style={style}
        aria-label="Expand"
      >
        <CgArrowsExpandRight />
      </button>
    </div>
  );
}
