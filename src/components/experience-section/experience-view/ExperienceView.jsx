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
        <span className="location">
          <Tag
            text={experience.location}
            color="rgb(109, 120, 140)"
            background="rgb(199, 219, 255)"
          />
        </span>
      );
    }
  }

  function renderLink() {
    // Adds two buttons if the url is an array
    // Only supports adding up to two buttons
    if (typeof experience.url === "string") {
      return (
        <Button
          icon={<FiLink />}
          text="Site"
          hideWhenSmall={true}
          link={experience.url}
        />
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
          <h4 className="mainHeading">Additional Details</h4>
          <div
            className="description"
            dangerouslySetInnerHTML={{
              __html: experience.additionalInformation,
            }}
          ></div>
        </div>
      );
    }
  }

  function renderPositions() {
    const positionsInOrder = experience.positions.slice().reverse();
    return (
      <div className="positions">
        {positionsInOrder.map((position, key) => (
          <div className="position" key={key}>
            <div className="details">
              <h1>{position.title}</h1>
              <div class="dates-type">
                {position.dates} | <span class="no-wrap">{position.type}</span>
              </div>
            </div>
            <div className="summary">
              <ul>
                {position.description.map((item, itemKey) => (
                  <li key={itemKey}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="modal-view experience-modal experience">
      <div className="header-image">
        <img src={experience.headerImage} alt="Header" />
      </div>
      <div className="experience-contents contents">
        <div className="details">
          <div className="left-justified">
            <div className="main-details">
              <div className="logo">
                <img src={experience.logo} alt="Experience logo" />
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
          </div>
        </div>
        <div className="body">
          {renderPositions()}
          {renderAdditionalDetails()}
        </div>
      </div>
    </div>
  );
}

export default ExperienceView;
