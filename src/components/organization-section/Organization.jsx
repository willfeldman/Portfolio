import "./Organization.scss";
import OrganizationCard from "./organization-card/OrganizationCard";
import { organizations } from "../../data/organization";
import { convertIdToComplement } from "../../data/operations";

let organizationComponents = [];
organizations.forEach((item,index)=>{
    organizationComponents.push( <OrganizationCard key={convertIdToComplement(index, organizations)} id={convertIdToComplement(index, organizations)} />)
})

function Organization() {
  return (
    <div className="organization-section organization">
      <div className="title">
        <h1>Organizations</h1>
      </div>
      <div className="cards">
        {organizationComponents}
      </div>
    </div>
  );
}

export default Organization;
