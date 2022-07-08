import Error from "../../error/Error";
import Button from "../../button/Button";
import { IoLinkOutline, IoLogoLinkedin } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { getExperienceById } from "../../../data/experience";
import "@reach/dialog/styles.css";
import "./ExperienceView.scss";

function ExperienceView(props) {
  let { id } = useParams();

  let experience = getExperienceById(Number(id));

  if (!experience) {
    return <Error />;
  }

  return (
    <div className="experience-modal">
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
                <span className="location">{experience.location}</span>
              </div>
            </div>
          </div>
          <div className="right-justified">
            <div className="action">
              <Button
                icon={<IoLinkOutline />}
                text="Site"
                link={experience.url}
              />
              <Button
                icon={<IoLogoLinkedin />}
                text="LinkedIn"
                link={experience.linkedin}
              />
            </div>
            <div className="dates">{experience.dates}</div>
          </div>
        </div>
        <div className="body">
          <div className="summary">
            <h4>Summary</h4>
            <ul>
              {experience.description.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="additional-details">
            <h4>Details</h4>
            <p>{experience.additionalInformation}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceView;
