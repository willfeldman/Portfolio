import "./Project.scss";
import ProjectCard from "./project-card/ProjectCard";
import { projects } from "../../data/project";
import { convertIdToComplement } from "../../data/operations";

let projectComponents = [];
projects.forEach((item,index)=>{
    projectComponents.push( <ProjectCard key={convertIdToComplement(index, projects)} id={convertIdToComplement(index, projects)} />)
})

function Project() {
  return (
    <div className="project-section">
      <div className="title">
        <h1>Projects</h1>
      </div>
      <div className="cards">
        {projectComponents}
      </div>
    </div>
  );
}

export default Project;
