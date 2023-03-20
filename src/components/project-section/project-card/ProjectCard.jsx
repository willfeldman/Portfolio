import Card from "../../elements/card/Card";
import Tag from "../../elements/tag/Tag";
import { useLocation, useNavigate } from "react-router-dom";
import { projects } from "../../../data/project";
import { getById } from "../../../data/operations";
import "./ProjectCard.scss";

export default function ProjectCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  // define colors for card
  let cardBackgroundColor = "rgb(199, 255, 208)";
  let cardTextColor = "rgb(109, 140, 114)";

  let project = getById(props.id, projects);

  const sendProjectClickEvent = () => {
    // sends an event to google analytics
    const eventName = `Project Click`;
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "ProjectCard",
        event_label: project.title,
      });
    }
  };

  const handleAction = () => {
    // sends an event to google analytics
    sendProjectClickEvent();
    // opens the project modal
    navigate(`/project/${project.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card
      action={handleAction}
      backgroundColor={cardBackgroundColor}
      textColor={cardTextColor}
    >
      <div className="project">
        <div className="projectTitle">
          <h1>{project.title}</h1>
        </div>
        <div className="text">
          <p>{project.description}</p>
        </div>
        <div className="tags">
          {project.tags.map((item, key) => (
            <Tag
              key={key}
              text={item.name}
              color={cardBackgroundColor}
              background={cardTextColor}
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
