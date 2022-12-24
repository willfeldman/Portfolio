import Card from "../../elements/card/Card";
import Tag from "../../elements/tag/Tag";
import { useLocation, useNavigate } from "react-router-dom";
import { projects } from "../../../data/project";
import { getById } from "../../../data/operations";
import "./ProjectCard.scss";

export default function ProjectCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  let project = getById(props.id, projects);

  const openProjectModal = () => {
    navigate(`/project/${project.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card action={openProjectModal} backgroundColor="rgb(199, 255, 208)" textColor="rgb(109, 140, 114)">
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
              color="rgb(199, 255, 208)"
              background="rgb(109, 140, 114)"
            />
          ))}
        </div>
      </div>
    </Card>
  );
}
