import React, { useEffect, useState } from "react";

import "../../assets/TopArtists.scss";
import { Swiper, SwiperSlide } from "swiper/react";

import { NavLink } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { getAllMusic } from "../../connection/MusicService";

function BrowseSongs({ theme, searchItem }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [songs, setSongs] = useState([]);

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
          <h3 id="text">Songs</h3>

          <NavLink className="none_text_decoration">
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
        className="mySwiper"
      >
        {songs
          .filter((song) => {
            if (searchItem === "") {
              return song;
            } else if (
              song.songName.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return song;
            } else if (song === "") {
              return (
                <>
                  <div>empty songs</div>
                </>
              );
            }
          })
          .map((song) => {
            return (
              <SwiperSlide key={song.songID}>
                <div className="artist_image">
                <img src="./images/download.jfif" alt="" />
                <div className="audiopart">
                <audio
                  className="audio"
                  controls
                  src={`/public/songs/${song.song}`}
                ></audio>
                <div className="buttons">
                  <div className="likebutton">
                    <FavoriteIcon/>
                  </div>
                  <div className="addtoplaylist">
                    <PlaylistAddIcon/>
                  </div>
                </div>
              </div>
                </div>
                <div className="artist_info">
                  <h5 id="text">{song.songName}</h5>
                  {/* <h6>{artist.name}</h6> */}
                </div>
              </SwiperSlide>
            );
          })}
        {songs.filter((song) => {
          if (searchItem === "") {
            return song;
          } else if (
            song.songName.toLowerCase().includes(searchItem.toLowerCase())
          ) {
            return song;
          }
        }).length === 0 && (
          <SwiperSlide>
            <div>No songs found</div>
          </SwiperSlide>
        )}
      </Swiper>

      {}
    </div>
  );
}

export default BrowseSongs;
