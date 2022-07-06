import "./ExperienceCard.scss";
import { Link, useLocation } from "react-router-dom";

function ExperienceCard(props) {
  let location = useLocation();
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
        <Link to={`/experience/${props.id}`} state={{ backgroundLocation: location }}><button className="moreButton">Details</button></Link>
      </div>
    </div>
  );
}

export default ExperienceCard;
