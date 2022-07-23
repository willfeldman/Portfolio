import Header from "../header/Header";
import Experience from "../experience-section/Experience";
import Project from "../project-section/Project";
import "./Homepage.scss";
import Organization from "../organization-section/Organization";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Experience />
      <Project />
      <Organization />
    </div>
  );
}

export default Homepage;
