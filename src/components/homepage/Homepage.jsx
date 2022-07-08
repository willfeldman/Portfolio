import Header from "../header/Header";
import Experience from "../experience-section/Experience";
import "./Homepage.scss";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Experience />
    </div>
  );
}

export default Homepage;
