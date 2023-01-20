import "./Education.scss";
import CardSection from "../elements/card-section/CardSection";
import EducationCard from "./education-card/EducationCard";
import { educations } from "../../data/education";
import { convertIdToComplement } from "../../data/operations";

let educationComponents = [];
educations.forEach((item, index) => {
  educationComponents.push(
    <EducationCard
      key={convertIdToComplement(index, educations)}
      id={convertIdToComplement(index, educations)}
    />
  );
});

function Education() {
  return (
    <div className="education-section education">
      <CardSection title="Education" cards={educationComponents} />
    </div>
  );
}

export default Education;
