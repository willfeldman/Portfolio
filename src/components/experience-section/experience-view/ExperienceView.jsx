import Error from "../../error/Error";
import Button from "../../elements/button/link/Button";
import Tag from "../../elements/tag/Tag";
import { IoLogoLinkedin } from "react-icons/io5";
import { FiLink } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { experiences } from "../../../data/experience";
import { getById } from "../../../data/operations";
import "@reach/dialog/styles.css";
import "./ExperienceView.scss";

function ExperienceView() {
  let { id } = useParams();

  let experience = getById(Number(id), experiences);

  if (!experience) {
    return <Error />;
  }

  function renderLocation() {
    // renders the location tag if in the data
    if (experience.location) {
      return (
        <span className="location"><Tag text={experience.location} color="white" background="#0281d4" /></span>
      );
    }
  }

  function renderLink() {
    // Adds two buttons if the url is an array
    // Only supports adding up to two buttons
    if (typeof experience.url === "string") {
      return (
        <Button icon={<FiLink />} text="Site" hideWhenSmall={true} link={experience.url} />
      );
    } else {
      return (
        <>
          <Button
            icon={<FiLink />}
            tooltip={true}
            text="Site 1"
            hideWhenSmall={true}
            link={experience.url[0]}
          />
          <Button
            icon={<FiLink />}
            tooltip={true}
            text="Site 2"
            hideWhenSmall={true}
            link={experience.url[1]}
          />
        </>
      );
    }
  }

  function renderLinkedIn() {
    // renders the link for LinkedIn if it is in the data
    if (experience.linkedin) {
      return (
        <Button
          icon={<IoLogoLinkedin />}
          text="LinkedIn"
          hideWhenSmall={true}
          link={experience.linkedin}
        />
      );
    }
  }

  function renderAdditionalDetails() {
    // renders the additional details section if it is in the data
    if (experience.additionalInformation) {
      return (
        <div className="additional-details">
          <h4 className="mainHeading">Details</h4>
          {experience.additionalInformation}
        </div>
      );
    }
  }

  return (
    <div className="experience-modal experience">
      <div className="header-image">
        <img src={experience.headerImage} alt="Header" />
      </div>
      <div className="experience-contents">
        <div className="details">
          <div className="left-justified">
            <div className="logo">
              <img src={experience.logo} alt="Experience logo" />
            </div>
            <div className="main-details">
              <div className="position">
                <h1 id="label">{experience.position}</h1>
              </div>
              <div className="company-location">
                <span className="company">{experience.company}</span>{" "}
                {renderLocation()}
              </div>
            </div>
          </div>
          <div className="right-justified">
            <div className="action">
              {renderLink()}
              {renderLinkedIn()}
            </div>
            <div className="dates-type">
              {experience.dates} | <span className="no-wrap">{experience.type}</span>
            </div>
          </div>
        </div>
        <div className="body">
          <div className="summary">
            <h4 className="mainHeading">Summary</h4>
            <ul>
              {experience.description.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
          </div>
          {renderAdditionalDetails()}
        </div>
      </div>
    </div>
  );
}

export default ExperienceView;
