import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // basic
import SwiperCore, { Navigation, Pagination } from "swiper";
import "swiper/css"; //basic
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Reference.css";

SwiperCore.use([Navigation, Pagination]);



const textList = [
  `"Before every show, I have to put perfume on. I know the crowd's not necessarily going to smell me,
but when I smell good, I feel like I can dominate the room.."\n
매번 공연하기 전에 향수를 뿌려야 한다.
군중들이 다 내 향을 맡진 않겠지만 좋은 향이 나면 공간을 지배할 수 있을 것 같은 기분이 든다.\n              
- Rita Ora -`,
  
  `
  "Perfume is a story in odor, sometimes poetry in memory."\n
  향수는 냄새의 이야기이며, 때로는 기억의 시이기도 합니다.\n
- Jean Claude Ellena -
  `,

  `\n“Perfume is the art that makes memory speak.”\n
  향수는 기억을 말하게하는 예술이다.\n
  - Francis kurkdjian -`,

  `\n“No elegance is possible without perfume. It is the unseen, unforgettable, ultimate accessory.”\n
  향수 없이는 우아함이 불가능합니다. 향수는 눈에 보이지 않는 잊을 수 없는 최고의 액세서리입니다.\n
- Coco Chanel -`
];

function Reference() {

  return (
    <div className="Reference">
      <div id="wrap">
        <section id="contents04">
          <div className="jb-box">
            <video muted autoPlay loop>
              <source src="videos/videos01.mp4" type="video/mp4" />
              <strong>Your browser does not support the video tag.</strong>
            </video>
            <div className="jb-text">
              <p>Korea IT</p>
            </div>
          </div>
        </section>
        <section id="contents05">
        <div className="Slider">
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        pagination={{ clickable: true }}
        breakpoints={{
          768: {
            slidesPerView: 1,
          },
        }}
      >
         {textList.map((item) => (
          <SwiperSlide className="Slider">
          <div className="Slider-box">
            <p className="Slider-info">
              {item}
            </p>
          </div>
        </SwiperSlide>
         ))}
      </Swiper>
    </div>
        </section>
        <section id="contents06">
          <h4>PERFUME</h4>
        </section>
      </div>
    </div>
  );
}

export default Reference;
