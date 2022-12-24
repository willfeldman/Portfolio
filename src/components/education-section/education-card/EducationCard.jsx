import "./EducationCard.scss";
import Card from "../../elements/card/Card";
import Tag from "../../elements/tag/Tag";
import { useLocation } from "react-router-dom";
import { educations } from "../../../data/education";
import { getById } from "../../../data/operations";

function EducationCard(props) {
  let location = useLocation();

  let education = getById(props.id, educations);

  return (
    <Card expandable={false} customClass="educationCard" backgroundColor="rgb(255, 199, 229)" textColor="rgb(140, 109, 125)">
      <div className="header education">
        <div className="text-header">
          <div className="school">
            <h1>{education.school}</h1>
          </div>
          <div className="details">
            <span className="subtitle">{education.subtitle}</span>
            <span className="tags">
              {education.tags.map((item, key) => (
                <span className="tag">
                  <Tag
                    key={key}
                    text={item}
                    color="rgb(255, 199, 229)"
                    background="rgb(140, 109, 125)"
                  />
                </span>
              ))}
            </span>
            <div className="years">{education.years}</div>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default EducationCard;
