import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./Carousel.scss";
import { Navigation } from "swiper";
import Expand from "../button/expand/Expand";
import { useNavigate } from "react-router-dom";

export default function Carousel(props) {
  const navigate = useNavigate();

  var slides = props.slides;
  
  return (
    <div className="slideshow">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        loop={true}
        loopFillGroupWithBlank={true}
        centeredSlides={true}
        navigation={true}
        breakpoints={{
          505: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          880: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides.map((item, key) => (
          <SwiperSlide key={key}>
            <div className="expandSlideButton">
              <Expand size="30px" onClick={() => navigate('/image', { state: { src: item } })} />
            </div>
            <img alt="Carousel element" src={item} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
