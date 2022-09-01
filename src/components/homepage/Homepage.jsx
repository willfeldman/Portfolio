import "./Homepage.scss";
import Profile from "../profile/Profile";
import Experience from "../experience-section/Experience";
import Project from "../project-section/Project";
import Organization from "../organization-section/Organization";
import Education from "../education-section/Education";
import Award from "../award-section/Award";

function Homepage() {
  return (
    <div className="homepage">
      <Profile />
      <Experience />
      <Organization />
      <Project />
      <Education />
      <Award />
    </div>
  );
}

export default Homepage;
