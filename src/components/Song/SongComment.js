import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Comments from "./Comments";
import { useStateValue } from "../../context/StateProvider";
import SingleSongAudioPLayer from "../Musicplayer/SingleSongAudioPLayer";
import "../../assets/comments.scss";
import { actionType } from "../../context/reducer";
import { useEffect } from "react";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  display:"flex",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,

};

export default function SongComments({ open, handleClose, selectedSongId }) {
  const [{ allSongs, isSongPlaying , song}, dispatch] = useStateValue([]);
  const selectedSong = allSongs.find((song) => song.songID === selectedSongId);

 useEffect(() => {
    dispatch({
        type: actionType.SET_CURRENT_SONG,
        currentlyPlayingSong: selectedSong,
      })

 }, [dispatch])
 

      
  
  return (
    <Modal
      open={open}
      onClose={handleClose}
      className="model"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="comment_container">
        <SingleSongAudioPLayer selectedSong={selectedSong} />
        <Comments selectedSong={selectedSong} />
      </Box>
    </Modal>
  );
}
