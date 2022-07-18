import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import "./Carousel.scss";

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
      <div class="item">
        <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div class="item">
      <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div class="item">
        <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div class="item">
        <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div class="item">
        <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
      <div class="item">
        <a target="_blank" rel="noreferrer" alt="Placeholder" href="https://via.placeholder.com/400x250"><img src="https://via.placeholder.com/400x250" /></a>
      </div>
    </OwlCarousel>
  );
}
