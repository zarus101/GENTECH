import { useState, useEffect } from "react";
import "../assets/fixfooter.scss";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PauseCircleIcon from "@mui/icons-material/PauseCircle";
import ListIcon from "@mui/icons-material/List";
import CancelIcon from "@mui/icons-material/Cancel";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import FastRewindIcon from "@mui/icons-material/FastRewind";
import FastForwardIcon from "@mui/icons-material/FastForward";
import { styled, Slider, Modal, Typography, Button } from "@mui/material";
import { useRef } from "react";
import { motion } from "framer-motion";

import { actionType } from "../context/reducer";
import { useCallback } from "react";
import { getAllMusic } from "../connection/MusicService";
import { toast } from "react-hot-toast";
import { Box } from "@mui/system";
import SubscriptionModal from "../components/Subscription/Subscription";
import { getCurrentUserDetail, isLoggedIN } from "../connection/UserService";
import { Navigate, NavLink } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";

const MusicSlider = styled(Slider)(({ theme, ...props }) => ({
  color: "brown",
  height: 2,
  "&:hover": {
    cursor: "auto",
  },
  "& .MuiSlider-thumb": {
    width: "13px",
    height: "13px",
    display: props.thumbless ? "none" : "block",
  },
}));

const FixFooter = () => {
  const [
    {
      allSongs,
      song,
      currentlyPlayingSong,
      isSongPlaying,
      miniPlayer,
      slideUp,
      Playing,
    },
    dispatch,
  ] = useStateValue([]);
  const [volume, setVolume] = useState(60);
  const [muteVolume, setMuteVolume] = useState(false);
  const [duration, setDuration] = useState(100);
  const [timeProgress, setTimeProgress] = useState(0);
  const [isPlayList, setIsPlayList] = useState(false);
  const [premium, setPremium] = useState(false);
  const [open, setOpen] = useState(false);
  const [loginModelOpen, setLoginModelOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleLoginClose = () => setLoginModelOpen(false);

  const [isPlaying, setIsPlaying] = useState();
  const audioPlayer = useRef();
  const progressBarRef = useRef();
  const playAnimationRef = useRef();

  const repeat = useCallback(() => {
    const currentTime = audioPlayer.current.currentTime;
    setTimeProgress(currentTime);
    progressBarRef.current.value = currentTime;
    progressBarRef.current.style.setProperty(
      "--range-progress",
      `${(progressBarRef.current.value / duration) * 100}%`
    );
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [audioPlayer, duration, progressBarRef, setTimeProgress]);

  useEffect(() => {
    if (audioPlayer) {
      audioPlayer.current.volume = volume / 100;
      audioPlayer.current.muted = muteVolume;
    }
  }, [volume, audioPlayer, muteVolume]);

  function VolumeBtns() {
    return muteVolume || volume === 0 ? (
      <VolumeOffIcon
        sx={{ color: "red", "&:hover": { color: "black" } }}
        onClick={() => setMuteVolume(!muteVolume)}
      />
    ) : volume <= 20 ? (
      <VolumeMuteIcon
        sx={{ color: "red", "&:hover": { color: "black" } }}
        onClick={() => setMuteVolume(!muteVolume)}
      />
    ) : volume <= 75 ? (
      <VolumeDownIcon
        sx={{ color: "brown", "&:hover": { color: "black" } }}
        onClick={() => setMuteVolume(!muteVolume)}
      />
    ) : (
      <VolumeUpIcon
        sx={{ color: "brown", "&:hover": { color: "black" } }}
        onClick={() => setMuteVolume(!muteVolume)}
      />
    );
  }

  useEffect(() => {
    if (isPlaying) {
      if (audioPlayer.current) {
        console.log(currentlyPlayingSong?.song_type);
        if (currentlyPlayingSong?.song_type === "premium") {
          if (
            isLoggedIN() &&
            getCurrentUserDetail().user.account_type === "premium"
          ) {
            audioPlayer.current.play();
            console.log(getCurrentUserDetail());
          } else if (
            isLoggedIN() &&
            getCurrentUserDetail().user.role === "admin"
          ) {
            audioPlayer.current.play();
          } else if (
            isLoggedIN() &&
            getCurrentUserDetail().user.account_type === "normal"
          ) {
            dispatch({
              type: actionType.SET_PLAYING,
              Playing: false,
            });
            toast.error("This song is premium and cannot be played.");
            setOpen(true);
            console.log(isLoggedIN());
            return;
          } else if (
            !isLoggedIN() &&
            currentlyPlayingSong?.song_type === "premium"
          ) {
            dispatch({
              type: actionType.SET_PLAYING,
              Playing: false,
            });
            toast.error("This song is premium and cannot be played.");
            setLoginModelOpen(true);
            return;
          }
          // Display popup message and return without playing the song
        }

        audioPlayer.current.play();
      }
      dispatch({
        type: actionType.SET_PLAYING,
        Playing: true,
      });
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    } else {
      if (audioPlayer.current) {
        audioPlayer.current.pause();
      }
      dispatch({
        type: actionType.SET_PLAYING,
        Playing: false,
      });
    }
    playAnimationRef.current = requestAnimationFrame(repeat);
  }, [isPlaying, dispatch, audioPlayer, repeat, currentlyPlayingSong]);

  const nextTrack = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song],
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });

      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song + 1],
      });
    }
  };

  const previousTrack = () => {
    if (song === 0) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song],
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });

      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song - 1],
      });
    }
  };

  const handleNext = () => {
    if (song > allSongs.length) {
      dispatch({
        type: actionType.SET_SONG,
        song: 0,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song],
      });
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song + 1,
      });
      dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: allSongs[song + 1],
      });
    }
  };

  const skipForward = () => {
    audioPlayer.current.currentTime += 10;
  };

  const skipBackward = () => {
    if (audioPlayer.current.currentTime !== 0) {
      audioPlayer.current.currentTime -= 10;
    } else {
      dispatch({
        type: actionType.SET_SONG,
        song: song - 1,
      });
    }
  };

  const handleProgressChange = () => {
    audioPlayer.current.currentTime = progressBarRef.current.value;
  };

  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onLoadedMetadata = () => {
    const seconds = audioPlayer.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };

  const closeMusicPlayer = () => {
    if (isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: false,
      });
    }
  };

  const togglePlayer = () => {
    if (miniPlayer) {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: false,
      });
    } else {
      dispatch({
        type: actionType.SET_MINI_PLAYER,
        miniPlayer: true,
      });
    }
  };

  const toggleSlide = () => {
    if (slideUp) {
      dispatch({
        type: actionType.SET_SLIDE_UP,
        slideUp: false,
      });
    } else {
      dispatch({
        type: actionType.SET_SLIDE_UP,
        slideUp: true,
      });
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className={`fix-footer ${slideUp ? " active" : "normal-player"} `}
      >
        <div onClick={toggleSlide} className="slide-up-btn"></div>

        <div className="d-visibility"></div>

        <audio
          src={`/public/songs/${currentlyPlayingSong?.song}`}
          ref={audioPlayer}
          onLoadedMetadata={onLoadedMetadata}
          onEnded={handleNext}
        ></audio>

        {open && (
          <>
            <SubscriptionModal handleClose={handleClose} open={open} />
          </>
        )}

        {loginModelOpen && (
          <>
            <LoginModel
              handleClose={handleLoginClose}
              loginModelOpen={loginModelOpen}
            />
          </>
        )}

        {miniPlayer && (
          <div className="main-obj">
            <div className="toggle_button" onClick={togglePlayer}>
              <ArrowCircleRightIcon className="icon" />
            </div>
          </div>
        )}

        {slideUp && (
          <div className="audio-player-lg">
            <div className="audio-cover-lg-img">
              <img
                src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
                alt="SOng Cover"
              />
            </div>

            <div className="audio-music-progress">
              <span className="time current">{formatTime(timeProgress)}</span>

              <input
                type="range"
                ref={progressBarRef}
                defaultValue="0"
                onChange={handleProgressChange}
                className="input"
              />
              <span className="time">{formatTime(duration)}</span>
            </div>

            <div className="artist-info">
              <h2>
                {currentlyPlayingSong?.songName.length > 20
                  ? currentlyPlayingSong.songName.slice(0, 20)
                  : currentlyPlayingSong.songName}
              </h2>
              <h3>{currentlyPlayingSong.artistName}</h3>
            </div>

            <div className="audio-control-buttons">
              <div className="audio-controls">
                <div className="prev-button" onClick={previousTrack}>
                  <SkipPreviousIcon className="icon" />
                </div>
                <div className="rewind" onClick={skipBackward}>
                  <FastRewindIcon className="icon" />
                </div>

                <div
                  className="play-button"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <PauseCircleIcon className="icon " />
                  ) : (
                    <PlayCircleIcon className="icon " />
                  )}
                </div>

                <div className="forward" onClick={skipForward}>
                  <FastForwardIcon className="icon" />
                </div>

                <div className="next-button" onClick={nextTrack}>
                  <SkipNextIcon className="icon" />
                </div>
              </div>

              <div className="audio-volume">
                <VolumeBtns />
                <MusicSlider
                  type="range"
                  min={0}
                  max={100}
                  value={volume}
                  onChange={(e) => setVolume(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {!slideUp && (
          <div className={`mini-player ${miniPlayer ? " active" : ""} `}>
            <div className="flex">
              <div className="artist-cover-img">
                {/* <img
                src={props.songs[props.currentSongIndex].img_src}
                alt={props.songs[props.currentSongIndex].title}
              /> */}

                <img
                  src="https://www.lovethispic.com/uploaded_images/126066-I-Love-Music.gif?1"
                  alt="'Song Cover"
                />
              </div>
              <div className="artist-info">
                <div className="info">
                  <h2>
                    {currentlyPlayingSong?.songName.length > 20
                      ? currentlyPlayingSong?.songName.slice(0, 20)
                      : currentlyPlayingSong?.songName}
                  </h2>
                  <h3>{currentlyPlayingSong?.artistName}</h3>
                </div>

                <motion.i
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlayList(!isPlayList)}
                >
                  <ListIcon className="icon" />
                </motion.i>
              </div>
            </div>

            <div className="second_part">
              <div className="audio-music-progress">
                <span className="time current">{formatTime(timeProgress)}</span>
                <input
                  type="range"
                  ref={progressBarRef}
                  className="input"
                  defaultValue="0"
                  onChange={handleProgressChange}
                />
                <span className="time">{formatTime(duration)}</span>
              </div>

              <div className="mini-player-control">
                <div className="audio-volume">
                  <VolumeBtns />
                  <MusicSlider
                    type="range"
                    min={0}
                    max={100}
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                  />
                </div>

                <div className="audio-control-buttons">
                  <div className="prev-button" onClick={previousTrack}>
                    <SkipPreviousIcon className="icon" />
                  </div>

                  <div className="rewind" onClick={skipBackward}>
                    <FastRewindIcon className="icon" />
                  </div>
                  <div
                    className="play-button"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {Playing ? (
                      <PauseCircleIcon className="icon " />
                    ) : (
                      <PlayCircleIcon className="icon " />
                    )}
                  </div>
                  <div className="forward" onClick={skipForward}>
                    <FastForwardIcon className="icon" />
                  </div>

                  <div className="next-button" onClick={nextTrack}>
                    <SkipNextIcon className="icon" />
                  </div>
                </div>
              </div>
            </div>

            <div className="third_part">
              <div className="close-button" onClick={closeMusicPlayer}>
                <CancelIcon className="icon" />
              </div>
              <div className="toggle_button" onClick={togglePlayer}>
                <ArrowCircleRightIcon className="icon" />
              </div>
            </div>
          </div>
        )}

        <div className="navigation-menu"></div>
      </motion.div>

      {isPlayList && (
        <>
          <PlayListCard />
        </>
      )}
    </>
  );
};

const loginStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export const LoginModel = ({ loginModelOpen, handleClose }) => {
  return (
    <>
      <Modal
        open={loginModelOpen}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...loginStyle, width: 400 }}>
          <h2 id="parent-modal-title">Premium Song</h2>
          <p id="parent-modal-description">
            PLease Login to Play this premium Song
          </p>
          <NavLink to={"/login"}>
            <Button>Login</Button>
          </NavLink>
        </Box>
      </Modal>
    </>
  );
};

export const PlayListCard = () => {
  const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
  useEffect(() => {
    if (!allSongs) {
      getAllMusic().then((data) => {
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data.data,
        });
      });
    }
  }, []);

  const setCurrentPlaySong = (songindex) => {
    if (!isSongPlaying) {
      dispatch({
        type: actionType.SET_SONG_PLAYING,
        isSongPlaying: true,
      });
    }
    if (song !== songindex) {
      dispatch({
        type: actionType.SET_SONG,
        song: songindex,
      });
    }
  };

  return (
    <div className="playlist-section">
      {allSongs.length > 0 ? (
        allSongs.map((music, index) => (
          <motion.div
            initial={{ opacity: 0, translateX: -50 }}
            animate={{ opacity: 1, translateX: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`group w-full p-4 hover:bg-card flex gap-3 items-center cursor-pointer ${
              music?._id === song._id ? "bg-card" : "bg-transparent"
            }`}
            onClick={() => setCurrentPlaySong(index)}
          >
            <QueueMusicIcon className="text-textColor group-hover:text-headingColor text-2xl cursor-pointer" />

            <div className="flex items-start flex-col">
              <p className="text-lg text-headingColor font-semibold">
                {`${
                  music?.songName.length > 20
                    ? music?.songName.slice(0, 20)
                    : music?.songName
                }`}{" "}
                <span className="text-base">({music?.Description})</span>
              </p>
              <p className="text-textColor">
                {music?.artistID}{" "}
                <span className="text-sm text-textColor font-semibold">
                  ({music?.genreName})
                </span>
              </p>
            </div>
          </motion.div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default FixFooter;
