import "./Experience.css";
import ExperienceCard from "./experience-card/ExperienceCard";
import { experiences } from "../../data/experience";

let experienceComponents = [];
experiences.forEach((item,index)=>{
    experienceComponents.push( <ExperienceCard key={index} id={index + 1} position={item.position} company={item.company} location={item.location} description={item.description} dates={item.dates} />)
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
