import "./Homepage.scss";
import Header from "../header/Header";
import Experience from "../experience-section/Experience";
import Project from "../project-section/Project";
import Organization from "../organization-section/Organization";
import Education from "../education-section/Education";
import Award from "../award-section/Award";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Experience />
      <Project />
      <Organization />
      <Education />
      <Award />
    </div>
  );
}

export default Homepage;
