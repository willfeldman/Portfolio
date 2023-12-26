import "./Navigation.scss";
import { LiaWindowMinimize } from "react-icons/lia";
import { Link } from "react-router-dom";

function Navigation(props) {
  return (
    <>
      <div className="navigation-bar">
        <Link to="/" className="backButton">
          <img src={window.location.origin + '/icons/favicon.svg'} className="backIcon" alt="Will Feldman Logo" />
          <div className="backText">Home</div>
        </Link>
      </div>
      <div className="contents">{props.children}</div>
    </>
  );
}

export default Navigation;
