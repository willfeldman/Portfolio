import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { awards } from "../../../data/award";
import { getById } from "../../../data/operations";
import "./AwardCard.scss";

export default function AwardCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  let award = getById(props.id, awards);

  const openAwardModal = () => {
    navigate(`/award/${award.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card action={openAwardModal} backgroundColor="rgb(255, 255, 199)" textColor="rgb(140, 140, 109)">
      <div className="award">
        <div className="awardTitle">
          <h1>{award.name}</h1>
        </div>
        <div className="text">
          <p>{award.issuer}</p>
        </div>
      </div>
    </Card>
  );
}
