import "./Education.scss";
import EducationCard from "./education-card/EducationCard";
import { educations } from "../../data/education";
import { convertIdToComplement } from "../../data/operations";

let educationComponents = [];
educations.forEach((item,index)=>{
    educationComponents.push( <EducationCard key={convertIdToComplement(index, educations)} id={convertIdToComplement(index, educations)} />)
})

function Education() {
  return (
    <div className="education-section education">
      <div className="title">
        <h1>Education</h1>
      </div>
      <div className="cards">
        { educationComponents }
      </div>
    </div>
  );
}

export default Education;
