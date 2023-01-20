import "./Project.scss";
import CardSection from "../elements/card-section/CardSection";
import ProjectCard from "./project-card/ProjectCard";
import { projects } from "../../data/project";
import { convertIdToComplement } from "../../data/operations";

let projectComponents = [];
projects.forEach((item, index) => {
  projectComponents.push(
    <ProjectCard
      key={convertIdToComplement(index, projects)}
      id={convertIdToComplement(index, projects)}
    />
  );
});

function Project() {
  return (
    <div className="project-section">
      <CardSection title="Projects" cards={projectComponents} />
    </div>
  );
}

export default Project;
