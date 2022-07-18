import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./Slides.scss";

// import required modules
import { Navigation } from "swiper";

export default function Slides() {
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
              spaceBetween: 10
            },
            "@0.75": {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            "@1.00": {
              slidesPerView: 4,
              spaceBetween: 40,
            }
          }}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide><img alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" /></SwiperSlide>
        <SwiperSlide><img alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" /></SwiperSlide>
        <SwiperSlide><img alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" /></SwiperSlide>
        <SwiperSlide><img alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" /></SwiperSlide>
        <SwiperSlide><img alt="Placeholder" src="https://ik.imagekit.io/feldman/portfolio_vsc_screenshot.png" /></SwiperSlide>
      </Swiper>
    </div>
  );
}
