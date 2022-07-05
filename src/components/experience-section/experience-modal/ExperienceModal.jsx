import "./ExperienceModal.scss";
import { IoClose } from "react-icons/io5";

function ExperienceModal() {
  return (
    <div className="modal-background">
      <div className="experience-modal">
        <div className="header-image">
          <img
            src="https://ik.imagekit.io/feldman/blueport_header.png"
            alt="Header image"
          />
        </div>
        <div className="close-modal-button">
          <button>
            <IoClose />
          </button>
        </div>
        <div className="experience-contents">
          <div className="details">
            <div className="left-justified">
              <div className="logo">
                <img
                  src="https://ik.imagekit.io/feldman/blueport_logo.jpeg"
                  alt="Experience logo"
                />
              </div>
              <div className="main-details">
                <div className="position"><h1>Product Manager</h1></div>
                <div>
                  <span className="company">Blueport</span>
                  <span className="location">Boston, MA</span>
                </div>
              </div>
            </div>
            <div className="right-justified">
              <div className="site-button">Site</div>
              <div className="linkedin-button">LinkedIn</div>
              <div className="dates">Jan 2022 - Present</div>
            </div>
          </div>
          <div className="body">
            <div className="summery">Points</div>
            <div className="additional-details">More info</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExperienceModal;
