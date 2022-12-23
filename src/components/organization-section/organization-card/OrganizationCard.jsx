import "./OrganizationCard.scss";
import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { organizations } from "../../../data/organization";
import { getById } from "../../../data/operations";

function OrganizationCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  let organization = getById(props.id, organizations);

  const openOrganizationModal = () => {
    navigate(`/organization/${organization.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card action={openOrganizationModal} backgroundColor="rgb(255, 209, 199)" textColor="rgb(140, 114, 109)">
      <div className="organization">
        <div className="header">
          <div className="text-header">
            <div className="details">
              <span className="name">{organization.name}</span>
            </div>
            <div className="role">
              <h1>{organization.role[0].title}</h1>
            </div>
          </div>
        </div>
        <div className="description">
          <div className="text">
            <p>{organization.summary || organization.description[0]}.</p>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default OrganizationCard;
