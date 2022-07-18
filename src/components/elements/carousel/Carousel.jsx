import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Carousel.scss";

function expandOnClick() {
  console.log("clicked");
}

export default function Carousel() {
  return (
    <OwlCarousel
      className="owl-carousel owl-theme"
      loop
      margin={10}
      dots={false}
      center={true}
      responsive={{
        0: {
          items: 2,
        },
        1000: {
          items: 4,
        },
      }}
    >
      <div className="item">
        <img onClick={expandOnClick()} alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" />
      </div>
      <div className="item">
      <a target="_blank" rel="noreferrer" href="https://via.placeholder.com/400x250"><img alt="Placeholder" src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div className="item">
        <a target="_blank" rel="noreferrer" href="https://via.placeholder.com/400x250"><img alt="Placeholder" src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div className="item">
        <a target="_blank" rel="noreferrer" href="https://via.placeholder.com/400x250"><img alt="Placeholder" src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div className="item">
        <a target="_blank" rel="noreferrer" href="https://via.placeholder.com/400x250"><img alt="Placeholder" src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div className="item">
        <a target="_blank" rel="noreferrer" href="https://via.placeholder.com/400x250"><img alt="Placeholder" src="https://via.placeholder.com/400x250" /></a>
      </div>
    </OwlCarousel>
  );
}
