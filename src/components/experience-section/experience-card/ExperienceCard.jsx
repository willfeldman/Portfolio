import "./ExperienceCard.scss";

function ExperienceCard(props) {
  return (
    <div className="card">
      <div className="header">
        <div className="position">
          <h1>{props.position}</h1>
        </div>
        <div className="details">
          <span className="company">{props.company}</span>{" "}
          <span className="location">{props.location}</span>
        </div>
        <div className="description">
          <div className="text">
            <p>{props.description[0]}...</p>
          </div>
          <div className="dates">
            <p>{props.dates}</p>
          </div>
        </div>
      </div>
      <div className="action">
        <button className="moreButton">Details</button>
      </div>
    </div>
  );
}

export default ExperienceCard;
