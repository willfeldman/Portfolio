import "./OrganizationCard.scss";
import Card from "../../elements/card/Card";
import { useLocation, useNavigate } from "react-router-dom";
import { organizations } from "../../../data/organization";
import { getById } from "../../../data/operations";

function OrganizationCard(props) {
  let location = useLocation();
  let navigate = useNavigate();

  // define colors for card
  let cardBackgroundColor = "rgb(255, 209, 199)";
  let cardTextColor = "rgb(140, 114, 109)";

  let organization = getById(props.id, organizations);

  const sendOrganizationClickEvent = () => {
    // sends an event to google analytics
    const eventName = `Organization Click`;
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, {
        event_category: "OrganizationCard",
        event_label: organization.name,
      });
    }
  };

  const handleAction = () => {
    // sends an event to google analytics
    sendOrganizationClickEvent();
    // opens the organization modal
    navigate(`/organization/${organization.id}`, {
      state: { backgroundLocation: location },
    });
  };

  return (
    <Card action={handleAction} backgroundColor={cardBackgroundColor} textColor={cardTextColor}>
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
