import "./Experience.css";
import ExperienceCard from "./experience-card/ExperienceCard";
import { experiences } from "../../data/experience";
import { convertIdToComplement } from "../../data/experience";

let experienceComponents = [];
experiences.forEach((item,index)=>{
    experienceComponents.push( <ExperienceCard key={convertIdToComplement(index)} id={convertIdToComplement(index)} />)
})

function Experience() {
  return (
    <div className="experience-section">
      <div className="title">
        <h1>Experience</h1>
      </div>
      <div className="cards">
        { experienceComponents }
      </div>
    </div>
  );
}

export default Experience;
