import "./ExperienceCard.scss";
import Button from "../../button/Button";
import { useLocation, useNavigate } from "react-router-dom";

function ExperienceCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  const openExperienceModal = () => {
    navigate(`/experience/${props.id}`, {
      state: { backgroundLocation: location },
    });
  };

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
        <Button
          customClass="moreButton"
          text="Details"
          action={openExperienceModal}
        />
      </div>
    </div>
  );
}

export default ExperienceCard;
