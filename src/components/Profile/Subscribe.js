import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import { getAllMusic } from "../../connection/MusicService";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import { actionType } from "../../context/reducer";
import { useStateValue } from "../../context/StateProvider";
import { getCurrentUserDetail } from "../../connection/UserService";

export default function Subscribe() {
  const [{ isSongPlaying, song }, dispatch] = useStateValue();

  const [songs, setSongs] = useState([]);
  useEffect(() => {
    getAllMusic()
      .then((data) => {
        setSongs(data);
      })
      .catch((error) => {
        console.log(error);
      });

      console.log(getCurrentUserDetail())
  }, []);
  const premiumSongs = songs.filter((song) => song.song_type === "premium");

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
  };
  return (
    <>
      {getCurrentUserDetail()?.user.account_type !== "premium" ? (
        <>
          {premiumSongs.length > 0 ? (
            <>
              {premiumSongs.map((song, index) => (
                <motion.div
                  initial={{ opacity: 0, translateY: -50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  onTap={{}}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="mostplayed_element_play"
                  onClick={() => addSongToContext(index, song)}
                  key={index}
                >
                  <div className="left">
                    <span className="primary_text_color">{song.songID}</span>

                    <img
                      src={
                        song.coverphoto
                          ? `/public/img/coverphoto/${song.coverphoto}`
                          : "../images/download.jfif"
                      }
                      style={{ height: "50px" }}
                      alt="artists"
                    />

                    <PlayArrowIcon className="grey_text" />

                    <span className="primary_text_color">{song.songName}</span>
                  </div>
                  <WorkspacePremiumIcon style={{ color: "goldenrod" }} />
                </motion.div>
              ))}
            </>
          ) : (
            <h1>No songs added</h1>
          )}
        </>
      ) : (
        <>
          {" "}
          <h1>You have not subscribed your account.</h1>
        </>
      )}
    </>
  );
}
