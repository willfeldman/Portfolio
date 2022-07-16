import "./Tag.scss";

export default function Tag(props) {
  return (
    <span
      style={{ color: props.color, backgroundColor: props.background }}
      className="tagComponent"
    >
      {props.text}
    </span>
  );
}
