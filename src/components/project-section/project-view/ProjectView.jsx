import Error from "../../error/Error";
import Button from "../../elements/button/link/Button";
import Carousel from "../../elements/carousel/Carousel";
import Tag from "../../elements/tag/Tag";
import { IoLogoGithub } from "react-icons/io5";
import { HiOutlineCode } from "react-icons/hi";
import { FiLink } from "react-icons/fi";
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

  function renderGitHubLink() {
    // renders the link for GitHub if it is in the data
    if (project.github) {
      return (
        <Button icon={<IoLogoGithub />} text="GitHub" link={project.github} />
      );
    }
  }

  function renderCodeLink() {
    // renders the link for code if it is in the data
    if (project.code) {
      return (
        <Button icon={<HiOutlineCode />} text="Code" link={project.code} />
      );
    }
  }

  function renderLink() {
    // renders a link button if it is in the data
    if (project.url) {
      return <Button icon={<FiLink />} text="Site" link={project.url} />;
    }
  }

  function renderAdditionalDetails() {
    // renders the additional details section if it is in the data
    if (project.additionalInformation) {
      return (
        <div className="additional-details">
          <h4 className="mainHeading">Additional Details</h4>
          <div className="description" dangerouslySetInnerHTML={{ __html: project.additionalInformation }}></div>
        </div>
      );
    }
  }

  return (
    <div className="modal-view projectView">
      <div className="carousel">
        <Carousel slides={project.images} />
      </div>
      <div className="project-contents contents">
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
            {renderGitHubLink()}
            {renderCodeLink()}
            {renderLink()}
          </div>
        </div>
        <div className="text">
          {project.description}
          <div>
            {renderAdditionalDetails()}
          </div>
        </div>
      </div>
    </div>
  );
}
