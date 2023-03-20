import "./Button.scss";
import "../../../../styles/tooltip.scss";

export default function Button(props) {
  function openLink() {
    sendLinkClickEvent();
    window.open(props.link, "_blank", "noreferrer");
  }

  function sendLinkClickEvent() {
    // sends an event to google analytics
    const eventName = `Link Click`;
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "Button",
        event_label: props.link,
      });
    }
  }

  function addTooltip() {
    if (typeof props.tooltip === "boolean") {
      return (
        <span className="tooltiptext">{props.link.split("//").pop()}</span>
      );
    } else if (typeof props.tooltip === "string") {
      return <span className="tooltiptext">{props.tooltip}</span>;
    }
  }

  function addTooltipClass() {
    if (props.tooltip) {
      return "tooltip";
    }
  }

  function addButtonText() {
    if (props.text) {
      return (
        <div className={`button-text ${addHideWhenSmallClass()}`}>
          {props.text}
        </div>
      );
    }
  }

  function addHideWhenSmallClass() {
    if (props.hideWhenSmall) {
      return "hideWhenSmall";
    }
  }

  return (
    <button
      onClick={props.action || openLink}
      className={`${props.customClass} buttonComponent ${addTooltipClass()}`}
      aria-label={props.text || props.tooltip}
    >
      <div className="icon">{props.icon}</div>
      {addButtonText()}
      {addTooltip()}
    </button>
  );
}
