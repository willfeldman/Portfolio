import "./CardSection.scss";

function CardSection(props) {
  return (
    <div className="card-section">
      <div className="title">
        <h1>{props.title}</h1>
      </div>
      <div className="cards">{props.cards}</div>
    </div>
  );
}

export default CardSection;
