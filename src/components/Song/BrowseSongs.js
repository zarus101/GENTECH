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
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { getAllMusic } from "../../connection/MusicService";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import axios from "axios";

import "../../assets/NavbarSection.scss";
import "../../assets/Theme.scss";
import { toast } from "react-hot-toast";

function BrowseSongs({ theme, searchItem }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [userid, setUserid] = useState();

  const [show, setShow] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    let controller = new AbortController();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/v1/getAllPlaylist/${userid}`, {
          signal: controller.signal,
        });
        setPlaylists(response.data);
        controller = null;
      } catch (error) {
        console.log(error);
      }
    };
    if (!isLoggedIN()) return;

    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
    setUserid(getCurrentUserDetail().user.id);
    userid && fetchData();
    return () => controller?.abort();
  }, [userid]);

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

  const handleClick = async (songId, playlistId) => {
    try {
      const response = await axios.get(`/v1/getSingleSong/${songId}`);
      const song = response.data[0].song;
      const songName = response.data[0].songName;
      console.log(song);

      const playlistData = {
        playlist_id: playlistId,
        song: song,
        songName: songName,
      };

      const res = await axios.post(
        `v1/addSongsToPlaylist/${playlistId}`,
        playlistData,
        config
      );
      console.log(res.data);
      toast.success("Song added!!");
    } catch (error) {
      console.log(error);
      toast.error("Please Try Again!");
    }
    setShow(false);
  };

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  const handleMostPlayed = async (id) => {
    try {
      const response = await axios.put(`v1/updateplay/${id}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
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
                <div
                  className="artist_image"
                  onClick={() => handleMostPlayed(song.songID)}
                >
                  <img src="./images/download.jfif" alt="" />
                  <div className="audiopart">
                    <audio
                      className="audio"
                      controls
                      // onPause={}
                      src={`/public/songs/${song.song}`}
                    ></audio>
                    <div className="buttons">
                      <div className="likebutton">
                        <FavoriteIcon />
                      </div>
                      <div className="addtoplaylist">
                        <PlaylistAddIcon onClick={() => setShow(!show)} />
                        {show && (
                          <div className="playlist">
                            <ul>
                              {playlists.map((playlist) => (
                                <li
                                  key={playlist.playlistID}
                                  id="text"
                                  onClick={() =>
                                    handleClick(
                                      song.songID,
                                      playlist.playlistID
                                    )
                                  }
                                >
                                  <div className="nav-item">
                                    {playlist.name}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="artist_info">
                  <h5 id="text" onClick={() => handleMostPlayed(song.songID)}>
                    {song.songName}
                  </h5>
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
