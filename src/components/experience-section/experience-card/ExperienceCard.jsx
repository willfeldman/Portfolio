import "./ExperienceCard.scss";
import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { getExperienceById } from "../../../data/experience";

function ExperienceCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  let experience = getExperienceById(props.id);

  const openExperienceModal = () => {
    navigate(`/experience/${experience.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card action={openExperienceModal}>
      <div className="header">
        <div className="logo">
          <img src={experience.logo} alt="Experience logo" />
        </div>
        <div className="text-header">
          <div className="position">
            <h1>{experience.position}</h1>
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
