import React, { useState } from "react";

import "../Assests/TopArtists.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavLink } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import bestArtists from "../Data/artistsData.js";

function TopSongs({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };
  return (
    <div className="wrapper" id={theme}>
      <div className="carousel_header">
        <div className="carousal_title">
          <h3 id="text">Top Songs</h3>

          <p>- Top 10</p>
          <NavLink className="none_text_decoration" to={"/songs"}>
            <p id="text">
              See all <ArrowRightAltIcon className="see_all_arrow" />
            </p>
          </NavLink>
        </div>
        <div className="swiper_buttons">
          <button onClick={prevHandler}>
            <NavigateBeforeIcon />
          </button>
          <button onClick={nextHandler}>
            <NavigateNextIcon />
          </button>
        </div>
      </div>
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        // loop={true}
        // loopFillGroupWithBlank={true}
        breakpoints={{
          0: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        onSwiper={(swiper) => setSwiperRef(swiper)}
        // navigation={true}
        // modules={[Navigation]}
        className="mySwiper"
      >
        {bestArtists.map((artist) => (
          <SwiperSlide key={artist.id}>
            <div className="artist_image">
              <img src={artist.src} alt="" />
            </div>
            <div className="artist_info">
              <h5 id="text">{artist.title}</h5>
              <h6>{artist.name}</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopSongs;
