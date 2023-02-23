import React, { useState, useEffect } from "react";
import "../../assets/TopSongs.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { getAllMusic } from "../../connection/MusicService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

function TopSongs({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [songs, setSongs] = useState([]);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  useEffect(() => {
    getAllMusic()
      .then((data) => {
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
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
        className="mySwiper"
      >
        {songs.map((song) => (
          <SwiperSlide key={song.songID}>
            <div className="artist_image">
              <img
                src={
                  song.coverphoto
                    ? `/public/img/coverphoto/${song.coverphoto}`
                    : "../images/download.jfif"
                }
                alt=""
              />
              <div className="audiopart">
                <audio
                  className="audio"
                  controls
                  onPlay={handlePlay}
                  onPause={handlePause}
                  src={`/public/songs/${song.song}`}
                ></audio>
                <div className="buttons">
                  <div className="likebutton">
                    <FavoriteIcon />
                  </div>
                  <div className="addtoplaylist">
                    <PlaylistAddIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="artist_info">
              <h5 id="text">{song.songName}</h5>
              <h6>{song.artistName}</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopSongs;
