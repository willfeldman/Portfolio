import Error from "../../error/Error";
import "./AwardView.scss";
import { useParams } from "react-router-dom";
import { awards } from "../../../data/award";
import { getById } from "../../../data/operations";

export default function AwardView() {
  let { id } = useParams();

  let award = getById(Number(id), awards);

  if (!award) {
    return <Error />;
  }

  return (
    <div className="awardView">
      <div className="header-image" style={{ background: 'linear-gradient(#047ac9, #004d8f)', height: 200 }}></div>
      <div className="award-contents">
        <div className="top">
          <div className="left-justified">
            <div className="awardName">
              <h1>{award.name}</h1>
            </div>
          </div>
        </div>
        <div className="text">{award.issuer}</div>
        <div className="description">{award.description}</div>
      </div>
    </div>
  );
}
