import "./Homepage.scss";
import Header from "../header/Header";
import Experience from "../experience-section/Experience";
import Project from "../project-section/Project";
import Organization from "../organization-section/Organization";
import Education from "../education-section/Education";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Experience />
      <Project />
      <Organization />
      <Education />
    </div>
  );
}

export default Homepage;
