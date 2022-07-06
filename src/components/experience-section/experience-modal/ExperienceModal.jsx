import "./ExperienceModal.scss";
import { IoClose, IoLinkOutline, IoLogoLinkedin } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { experiences, getExperienceById } from "../../../data/experience";

function ExperienceModal(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  let experience = getExperienceById(Number(id));

  let headerImage = experience.headerImage;
  let logo = experience.logo;
  let position = experience.position;
  let company = experience.company;
  let location = experience.location;
  let url = experience.url;
  let linkedin = experience.linkedin;
  let dates = experience.dates;
  let summary = experience.description;
  let description = experience.additionalInformation;

  return (
    <div className="modal-background">
      <div className="experience-modal">
        <div className="header-image">
          <img src={headerImage} alt="Header" />
        </div>
        <div className="close-modal-button">
          <button onClick={() => navigate(-1)}>
            <IoClose />
          </button>
        </div>
        <div className="experience-contents">
          <div className="details">
            <div className="left-justified">
              <div className="logo">
                <img src={logo} alt="Experience logo" />
              </div>
              <div className="main-details">
                <div className="position">
                  <h1>{position}</h1>
                </div>
                <div>
                  <span className="company">{company}</span>{" "}
                  <span className="location">{location}</span>
                </div>
              </div>
            </div>
            <div className="right-justified">
              <div className="action">
                <a href={url} target="_blank" rel="noreferrer">
                  <button className="site-button">
                    <div className="icon"><IoLinkOutline /></div>
                    <div className="button-text">Site</div>
                  </button>
                </a>
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <button className="linkedin-button">
                    <div className="icon"><IoLogoLinkedin /></div>
                    <div className="button-text">LinkedIn</div>
                  </button>
                </a>
              </div>
              <div className="dates">{dates}</div>
            </div>
          </div>
          <div className="body">
            <div className="summary">
              <h4>Summary</h4>
              <ul>
                {summary.map((item, key) => (
                  <li key={key}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="additional-details">
              <h4>Details</h4>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;
