import Error from "../../error/Error";
import Button from "../../elements/button/Button";
import Carousel from "../../elements/carousel/Carousel";
import Tag from "../../elements/tag/Tag";
import { IoLogoGithub } from "react-icons/io5";
import "./ProjectView.scss";
import { useParams } from "react-router-dom";
import { projects } from "../../../data/project";
import { getById } from "../../../data/operations";

export default function ProjectView() {
  let { id } = useParams();

  let project = getById(Number(id), projects);

  if (!project) {
    return <Error />;
  }

  return (
    <div className="projectView">
      <div className="carousel">
        <Carousel slides={project.images} />
      </div>
      <div className="project-contents">
        <div className="top">
          <div className="left-justified">
            <div className="projectName">
              <h1>{project.title}</h1>
            </div>
            <div className="projectTags">
              {project.tags.map((item, key) => (
                <Tag
                  key={key}
                  text={item.name}
                  color={item.color}
                  background={item.background}
                />
              ))}
            </div>
          </div>
          <div className="links">
            <Button icon={<IoLogoGithub />} text="GitHub" link={project.github} />
          </div>
        </div>
        <div className="text">{project.description}</div>
      </div>
    </div>
  );
}
