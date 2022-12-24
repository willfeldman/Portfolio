import "./EducationCard.scss";
import Card from "../../elements/card/Card";
import Tag from "../../elements/tag/Tag";
import { useLocation } from "react-router-dom";
import { educations } from "../../../data/education";
import { getById } from "../../../data/operations";

function EducationCard(props) {
  let location = useLocation();

  // define colors for card
  let cardBackgroundColor = "rgb(255, 199, 229)";
  let cardTextColor = "rgb(140, 109, 125)";

  let education = getById(props.id, educations);

  return (
    <Card expandable={false} customClass="educationCard" backgroundColor={cardBackgroundColor} textColor={cardTextColor}>
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
                    color={cardBackgroundColor}
                    background={cardTextColor}
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
