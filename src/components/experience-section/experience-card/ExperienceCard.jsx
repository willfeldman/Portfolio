import "./ExperienceCard.scss";
import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { experiences } from "../../../data/experience";
import { getById } from "../../../data/operations";

function ExperienceCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  // define colors for card
  let cardBackgroundColor = "rgb(199, 219, 255)";
  let cardTextColor = "rgb(109, 120, 140)";

  let experience = getById(props.id, experiences);

  // figure out how many positions there are
  let positions = experience.positions;
  let numOfPositions = positions.length;

  const sendExperienceClickEvent = () => {
    // sends an event to google analytics
    const eventName = `Experience Click`;
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "ExperienceCard",
        event_label: experience.company,
      });
    }
  };

  const handleAction = () => {
    // sends an event to google analytics
    sendExperienceClickEvent();
    // opens the experience modal
    navigate(`/experience/${experience.id}`, {
      state: { backgroundLocation: location },
    });
  };

  function renderPosition() {
    // renders the correct position name (shows shortened if in the data)
    return experience.positions[numOfPositions - 1].title_nickname
      ? experience.positions[numOfPositions - 1].title_nickname
      : experience.positions[numOfPositions - 1].title;
  };

  return (
    <Card
      action={handleAction}
      backgroundColor={cardBackgroundColor}
      textColor={cardTextColor}
    >
      <div className="header experience">
        <div className="text-header">
        <div className="details">
            <span className="company">{experience.company}</span>
          </div>
          <div className="position">
            <h1>{renderPosition()}</h1>
          </div>
        </div>
      </div>
      <div className="description">
        <div className="text">
          <p>{experience.positions[numOfPositions - 1].summary || experience.positions[numOfPositions - 1].description[0]}...</p>
        </div>
        <div className="dates">
          <p>{experience.fullDates || experience.positions[numOfPositions - 1].dates}</p>
        </div>
      </div>
    </Card>
  );
}

export default ExperienceCard;
