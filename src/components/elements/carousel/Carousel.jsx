import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./Carousel.scss";
import { Navigation } from "swiper";

export default function Carousel(props) {
  var slides = props.slides;
  return (
    <div className="slideshow">
      <Swiper
        slidesPerView={4}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        centeredSlides={true}
        navigation={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          "@0.75": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 40,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {slides.map((item, key) => (
          <SwiperSlide key={key}>{item}</SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
