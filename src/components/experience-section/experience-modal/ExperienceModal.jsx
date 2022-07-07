import { IoClose, IoLinkOutline, IoLogoLinkedin } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { getExperienceById } from "../../../data/experience";
import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import "./ExperienceModal.scss";

function ExperienceModal(props) {
  let navigate = useNavigate();
  let { id } = useParams();

  let experience = getExperienceById(Number(id));

  if (!experience) return null;

  function close() {
    navigate(-1);
  }

  return (
    <Dialog
      aria-labelledby="label"
      onDismiss={close}
    >
      <div className="experience-modal">
        <div className="header-image">
          <img src={experience.headerImage} alt="Header" />
        </div>
        <div className="close-modal-button">
          <button onClick={close}>
            <IoClose />
          </button>
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
                <div>
                  <span className="company">{experience.company}</span>{" "}
                  <span className="location">{experience.location}</span>
                </div>
              </div>
            </div>
            <div className="right-justified">
              <div className="action">
                <a href={experience.url} target="_blank" rel="noreferrer">
                  <button className="site-button">
                    <div className="icon">
                      <IoLinkOutline />
                    </div>
                    <div className="button-text">Site</div>
                  </button>
                </a>
                <a href={experience.linkedin} target="_blank" rel="noreferrer">
                  <button className="linkedin-button">
                    <div className="icon">
                      <IoLogoLinkedin />
                    </div>
                    <div className="button-text">LinkedIn</div>
                  </button>
                </a>
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
    </Dialog>
  );
}

export default ExperienceModal;
