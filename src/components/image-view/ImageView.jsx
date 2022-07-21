import { useLocation } from "react-router-dom";
import Error from "../error/Error";
import "./ImageView.scss";

export default function ImageView(props) {
  const { state } = useLocation();

  if (!state || !state.src) {
    return <Error />;
  }

  const { src } = state;

  return (
    <div className="blackBackground">
      <img className="imageView" alt="Large view image" src={src} />
    </div>
  );
}
