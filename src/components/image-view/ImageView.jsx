import { useLocation, useNavigate } from "react-router-dom";
import Close from "../elements/button/close/Close";
import Error from "../error/Error";
import "./ImageView.scss";

export default function ImageView(props) {
  const { state } = useLocation();
  let navigate = useNavigate();

  if (!state || !state.src) {
    return <Error />;
  }

  const { src } = state;

  function goBack() {
    navigate(-1);
  }

  return (
    <div className="blackBackground">
      <Close onClick={goBack} />
      <img className="imageView" alt="Large view" src={src} />
    </div>
  );
}
