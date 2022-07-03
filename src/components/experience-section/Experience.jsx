import "./Experience.css";
import ExperienceCard from "./experience-card/ExperienceCard";

function Experience() {
  return (
    <div className="experience-section">
      <div className="title">
        <h1>Experience</h1>
      </div>
      <div className="cards">
        <ExperienceCard />
        <ExperienceCard />
        <ExperienceCard />
      </div>
    </div>
  );
}

export default Experience;
