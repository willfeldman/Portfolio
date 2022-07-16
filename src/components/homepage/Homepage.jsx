import Header from "../header/Header";
import Experience from "../experience-section/Experience";
import Project from "../project-section/Project";
import "./Homepage.scss";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Experience />
      <Project />
    </div>
  );
}

export default Homepage;
