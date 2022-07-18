import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Carousel2.scss";
import { Carousel } from "react-responsive-carousel";

export default function Carousel2(props) {
  return (
    <div className="slideshow">
      <Carousel
        centerMode={true}
        centerSlidePercentage={50}
        emulateTouch={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        ariaLabel={"Project images"}
        className={"slideshow"}
      >
        <div>
          <img src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" />
        </div>
        <div>
          <img src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" />
        </div>
        <div>
          <img src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" />
        </div>
      </Carousel>
    </div>
  );
}
