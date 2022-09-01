import "./Award.scss";
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
      <div className="title">
        <h1>Awards</h1>
      </div>
      <div className="cards">{awardComponents}</div>
    </div>
  );
}

export default Award;
