import "./Experience.scss";
import ExperienceCard from "./experience-card/ExperienceCard";
import { experiences } from "../../data/experience";
import { convertIdToComplement } from "../../data/operations";

let experienceComponents = [];
experiences.forEach((item,index)=>{
    experienceComponents.push( <ExperienceCard key={convertIdToComplement(index, experiences)} id={convertIdToComplement(index, experiences)} />)
})

function Experience() {
  return (
    <div className="experience-section">
      <div className="title">
        <h1>Experiences</h1>
      </div>
      <div className="cards">
        { experienceComponents }
      </div>
    </div>
  );
}

export default Experience;
