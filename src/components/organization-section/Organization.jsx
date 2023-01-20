import "./Organization.scss";
import CardSection from "../elements/card-section/CardSection";
import OrganizationCard from "./organization-card/OrganizationCard";
import { organizations } from "../../data/organization";
import { convertIdToComplement } from "../../data/operations";

let organizationComponents = [];
organizations.forEach((item, index) => {
  organizationComponents.push(
    <OrganizationCard
      key={convertIdToComplement(index, organizations)}
      id={convertIdToComplement(index, organizations)}
    />
  );
});

function Organization() {
  return (
    <div className="organization-section organization">
      <CardSection title="Organizations" cards={organizationComponents} />
    </div>
  );
}

export default Organization;
