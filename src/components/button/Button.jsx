import "./Button.scss";

export default function Button(props) {
    function openLink(url) {
        window.open(props.link, '_blank', 'noreferrer');
    }
  return (
      <button onClick={props.action || openLink} className={`${props.customClass} buttonComponent`}>
        <div className="icon">{props.icon}</div>
        <div className="button-text">{props.text}</div>
      </button>
  );
}
