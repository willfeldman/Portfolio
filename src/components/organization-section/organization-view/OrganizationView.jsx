import Error from "../../error/Error";
import Button from "../../elements/button/link/Button";
import { FiLink } from "react-icons/fi";
import { useParams } from "react-router-dom";
import { organizations } from "../../../data/organization";
import { getById } from "../../../data/operations";
import "@reach/dialog/styles.css";
import "./OrganizationView.scss";

function OrganizationView() {
  let { id } = useParams();

  let organization = getById(Number(id), organizations);

  if (!organization) {
    return <Error />;
  }

  function renderLink() {
    // renders the link for site if it is in the data
    if (organization.url) {
      return (
        <Button
          icon={<FiLink />}
          text="Site"
          hideWhenSmall={true}
          link={organization.url}
        />
      );
    }
  }

  function renderAdditionalDetails() {
    // renders the additional details section if it is in the data
    if (organization.additionalInformation) {
      return (
        <div className="additional-details">
          <h4 className="mainHeading">Details</h4>
          {organization.additionalInformation}
        </div>
      );
    }
  }

  return (
    <div className="organization-modal organization">
      <div className="header-image">
        <img src={organization.headerImage} alt="Header" />
      </div>
      <div className="organization-contents">
        <div className="details">
          <div className="left-justified">
            <div className="logo">
              <img src={organization.logo} alt="Organization logo" />
            </div>
            <div className="main-details">
              <div className="name">
                <h1 id="label">{organization.name}</h1>
              </div>
            </div>
          </div>
          <div className="right-justified">
            <div className="action">{renderLink()}</div>
          </div>
        </div>
        <div className="body">
          <div className="yearsActive">
            <h4>Years Active</h4>
            <p>{organization.yearsActive}</p>
          </div>
          <div className="leadershipRoles">
            <h4>Leadership Roles</h4>
            {organization.role.map((item, key) => (
              <p key={key}>
                {item.title}, {item.years}
              </p>
            ))}
          </div>
          <div className="summary">
            <ul>
              {organization.description.map((item, key) => (
                <li key={key}>{item}</li>
              ))}
            </ul>
          </div>
          {renderAdditionalDetails()}
        </div>
      </div>
    </div>
  );
}

export default OrganizationView;
