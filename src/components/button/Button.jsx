import "./Button.scss";
import "../../styles/tooltip.scss";

export default function Button(props) {
  function openLink(url) {
    window.open(props.link, "_blank", "noreferrer");
  }

  function addTooltip() {
    if (props.tooltip) {
      return <span class="tooltiptext">{props.link}</span>;
    }
  }

  function addTooltipClass() {
    if (props.tooltip) {
      return "tooltip";
    }
  }

  return (
    <button
      onClick={props.action || openLink}
      className={`${props.customClass} buttonComponent ${addTooltipClass()}`}
    >
      <div className="icon">{props.icon}</div>
      <div className="button-text">{props.text}</div>
      {addTooltip()}
    </button>
  );
}
