import "./Experience.scss";
import CardSection from "../elements/card-section/CardSection";
import ExperienceCard from "./experience-card/ExperienceCard";
import { experiences } from "../../data/experience";
import { convertIdToComplement } from "../../data/operations";

let experienceComponents = [];
experiences.forEach((item, index) => {
  experienceComponents.push(
    <ExperienceCard
      key={convertIdToComplement(index, experiences)}
      id={convertIdToComplement(index, experiences)}
    />
  );
});

function Experience() {
  return (
    <div className="experience-section experience">
      <CardSection title="Experiences" cards={experienceComponents} />
    </div>
  );
}

export default Experience;
