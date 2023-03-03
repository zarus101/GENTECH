import React, { useState, useEffect } from "react";
import "../../assets/TopSongs.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { NavLink, useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import { getAllMusic } from "../../connection/MusicService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import axios from "axios";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { toast } from "react-hot-toast";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";

function TopSongs({ theme }) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [{ currentlyPlayingSong, allSongs,likedSongs, song, isSongPlaying }, dispatch] =
    useStateValue([]);

  const [songs, setSongs] = useState([]);
  const [token, setToken] = useState();
  const [playlists, setPlaylists] = useState([]);
  const [userid, setUserid] = useState();
  const [active, setActive] = useState(false);

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
  }, [userid, playlists]);

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

  const handleLikeClicked = async (songId) => {
    try {
      const likedData = {
        songID: songId,
        userID: userid,
      };

      const res = await axios.post(`v1/songs/like`, likedData, config);
      console.log(res);
      if (res.status === 201) {
        toast.error(res.data);
        return;
      } else {
        toast.success("Song added!!");
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
    setShow(false);
  };

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
      })
      .catch((error) => {
        console.log(error);
      });
  }, [songs]);

  const sortedSongs = songs?.sort((a, b) => b.likes - a.likes);

  const addSongToContext = (index, currentsong) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      });
    }
    if (song !== index) {
      dispatch({
        type: actionType.SET_SONG,
        song: index,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: currentsong,
      });
    }
    console.log(currentsong);

    try {
      const response =  axios.put(`v1/updateplay/${currentsong?.songID}`);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }

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
        {sortedSongs.map((song, index) => (
          <SwiperSlide
            key={song.songID}
            onClick={() => addSongToContext(index, song)}
          >
            <div className="artist_image">
              <img
                src={
                  song.coverphoto
                    ? `/public/img/coverphoto/${song.coverphoto}`
                    : "../images/download.jfif"
                }
                alt=""
              />

              {likedSongs?.likedSongs?.includes(song.songID) && (
                <div className="liked-button">
                  <FavoriteIcon className="favouriteicon" />
                </div>
              )}
              <div className="audiopart">
                <div className="buttons">
                  <div className="likebutton">
                    <FavoriteIcon
                      onClick={() => handleLikeClicked(song.songID)}
                    />
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
                                handleClick(song.songID, playlist.playlistID)
                              }
                            >
                              <div className="nav-item">{playlist.name}</div>
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
              <h6>{song.artistName}</h6>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default TopSongs;
