import React, { useEffect, useState } from "react";

import "../../assets/TopArtists.scss";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { NavLink, useNavigate } from "react-router-dom";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

import axios from "axios";

function TopArtists({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [artists, setArtists] = useState([]);
  const navigate = useNavigate();

  const fetchData = () => {
    return axios
      .get("/v1/getAllArtist")
      .then((response) => setArtists(response.data))
      .catch((error) => console.error(`Error: ${error}`));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = (id, e) => {
    e.preventDefault();
    navigate(`/artist/${id}`);
  };

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
          <h3 id="text">Top Artists</h3>

          <p>- Top 10</p>
          <NavLink className="none_text_decoration" to={"/artists"}>
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
        {artists.map((artist) => (
          <SwiperSlide
            key={artist.artistID}
            onClick={(e) => handleClick(artist.artistID, e)}
          >
            <div className="artist_image">
              <img
                src={`/public/img/artist/${artist.artistPhoto}`}
                alt="Artist"
              />
            </div>
            <div className="artist_info">
              <h5 id="text">{artist.artistName}</h5>
              {/* <h6>{artist.name}</h6> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopArtists;
