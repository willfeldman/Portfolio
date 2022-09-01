import "./ExperienceCard.scss";
import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { experiences } from "../../../data/experience";
import { getById } from "../../../data/operations";

function ExperienceCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  let experience = getById(props.id, experiences);

  const openExperienceModal = () => {
    navigate(`/experience/${experience.id}`, {
      state: { backgroundLocation: location },
    });
  };

  function renderPosition() {
    // renders the correct position name (shows shortened if in the data)
    return experience.position_nickname ? experience.position_nickname : experience.position;
  }

  return (
    <Card action={openExperienceModal}>
      <div className="header experience">
        <div className="logo">
          <img src={experience.logo} alt="Experience logo" />
        </div>
        <div className="text-header">
          <div className="position">
            <h1>{renderPosition()}</h1>
          </div>
          <div className="details">
            <span className="company">{experience.company}</span>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="text">
          <p>{experience.summary || experience.description[0]}...</p>
        </div>
        <div className="dates">
          <p>{experience.dates}</p>
        </div>
      </div>
    </Card>
  );
}

export default ExperienceCard;
