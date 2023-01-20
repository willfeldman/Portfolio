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
    <div className="modal-view awardView">
      <div className="header-image"></div>
      <div className="award-contents contents">
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
