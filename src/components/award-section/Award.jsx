import "./Award.scss";
import CardSection from "../elements/card-section/CardSection";
import AwardCard from "./award-card/AwardCard";
import { awards } from "../../data/award";
import { convertIdToComplement } from "../../data/operations";

let awardComponents = [];
awards.forEach((item, index) => {
  awardComponents.push(
    <AwardCard
      key={convertIdToComplement(index, awards)}
      id={convertIdToComplement(index, awards)}
    />
  );
});

function Award() {
  return (
    <div className="award-section">
      <CardSection title="Awards" cards={awardComponents} />
    </div>
  );
}

export default Award;
