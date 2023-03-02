import React, { useEffect, useState } from "react";
import Header from "../../AdminComponents/Header";
import "../../../../assets/AdminSongList.scss";
import ClearIcon from "@mui/icons-material/Clear";
import { red } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import { toast } from "react-hot-toast";
import { Delete, Edit } from "@mui/icons-material";
import {
  deleteSongById,
  getAllMusic,
} from "../../../../connection/MusicService";
import { Box } from "@mui/system";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";

import {motion } from 'framer-motion'

const DashboardSongs = () => {
    const [songFilter, setSongFilter] = useState("");
    const [isFocus, setIsFocus] = useState(false);
    const [filteredSongs, setFilteredSongs] = useState(null);
  
    const [{ allSongs }, dispatch] = useStateValue();
  
    useEffect(() => {
      if (!allSongs) {
        getAllMusic().then((data) => {
          dispatch({
            type: actionType.SET_ALL_SONGS,
            allSongs: data,
          });
        });
      }
    }, []);
  
    useEffect(() => {
      if (songFilter.length > 0) {
        const filtered = allSongs.filter(
          (data) =>
            data.artist.toLowerCase().includes(songFilter) ||
            data.language.toLowerCase().includes(songFilter) ||
            data.name.toLowerCase().includes(songFilter)
        );
        setFilteredSongs(filtered);
      } else {
        setFilteredSongs(null);
      }
    }, [songFilter]);
  
    return (
      <div className="w-full p-4 flex items-center justify-center flex-col">
        <div className="w-full flex justify-center items-center gap-24">
          <NavLink
            to={"/dashboard/newSong"}
            className="flex items-center px-4 py-3 border rounded-md border-gray-300 hover:border-gray-400 hover:shadow-md cursor-pointer"
          >
            {/* <IoAdd /> */}
          </NavLink>
          <input
            type="text"
            placeholder="Search here"
            className={`w-52 px-4 py-2 border ${
              isFocus ? "border-gray-500 shadow-md" : "border-gray-300"
            } rounded-md bg-transparent outline-none duration-150 transition-all ease-in-out text-base text-textColor font-semibold`}
            value={songFilter}
            onChange={(e) => setSongFilter(e.target.value)}
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
          />
  
          {songFilter && (
            <motion.i
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileTap={{ scale: 0.75 }}
              onClick={() => {
                setSongFilter("");
                setFilteredSongs(null);
              }}
            >
              {/* <AiOutlineClear className="text-3xl text-textColor cursor-pointer" /> */}
            </motion.i>
          )}
        </div>
  
        <div className="relative w-full  my-4 p-4 py-12 border border-gray-300 rounded-md">
          <div className="absolute top-4 left-4">
            <p className="text-xl font-bold">
              <span className="text-sm font-semibold text-textColor">
                Count :{" "}
              </span>
              {filteredSongs ? filteredSongs?.length : allSongs?.length}
            </p>
          </div>
  
          <SongContainer data={filteredSongs ? filteredSongs : allSongs} />
        </div>
      </div>
    );
  };
  
  export const SongContainer = ({ data }) => {
    return (
      <div className=" w-full  flex flex-wrap gap-3  items-center justify-evenly">
        {data &&
          data.map((song, i) => (
            <SongCard key={song.songID} data={song} index={i} />
          ))}
      </div>
    );
  };
  
  export const SongCard = ({ data, index }) => {
    const [isDeleted, setIsDeleted] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState(null);
  
    const [{ allSongs, song, isSongPlaying }, dispatch] = useStateValue();
  
    const addSongToContext = () => {
      if (!isSongPlaying) {
        dispatch({
          type: actionType.SET_SONG_PLAYING,
          isSongPlaying: true,
        });
      }
      if (song !== index) {
        dispatch({
          type: actionType.SET_SONG,
          song: index,
        });
      }
    };
  
    const deleteObject = (id) => {
      console.log(id);
      deleteSongById(id).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          setAlert("success");
          setAlertMsg(res.data.msg);
          getAllMusic().then((data) => {
            dispatch({
              type: actionType.SET_ALL_SONGS,
              allSongs: data,
            });
          });
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        } else {
          setAlert("error");
          setAlertMsg(res.data.msg);
          setTimeout(() => {
            setAlert(false);
          }, 4000);
        }
      });
    };
    return (
      <motion.div
        whileTap={{ scale: 0.8 }}
        initial={{ opacity: 0, translateX: -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="relative w-40 min-w-210 px-2 py-4 cursor-pointer hover:shadow-xl hover:bg-card bg-gray-100 shadow-md rounded-lg flex flex-col items-center"
        onClick={addSongToContext}
      >
        {isDeleted && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="absolute z-10 p-2 inset-0 bg-card backdrop-blur-md flex flex-col gap-6 items-center justify-center"
          >
            <p className="text-sm text-center text-textColor font-semibold">
              Are you sure do you want to delete this song?
            </p>
  
            <div className="flex items-center gap-3">
              <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-teal-400"
                onClick={() => deleteObject(data._id)}
              >
                Yes
              </button>
              <button
                className="text-sm px-4 py-1 rounded-md text-white hover:shadow-md bg-gray-400"
                onClick={() => setIsDeleted(false)}
              >
                No
              </button>
            </div>
          </motion.div>
        )}
  
        <div className="w-40 min-w-[160px] h-40 min-h-[160px] rounded-lg drop-shadow-lg relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.05 }}
            src={data.imageURL}
            alt=""
            className=" w-full h-full rounded-lg object-cover"
          />
        </div>
  
        <p className="text-base text-headingColor font-semibold my-2">
          {data.songName.length > 25 ? `${data.name.slice(0, 25)}` : data.songName}
          <span className="block text-sm text-gray-400 my-1">{data.artist}</span>
        </p>
  
        <div className="w-full absolute bottom-2 right-2 flex items-center justify-between px-4">
          <motion.i whileTap={{ scale: 0.75 }} onClick={() => setIsDeleted(true)}>
            {/* <IoTrash className="text-base text-red-400 drop-shadow-md hover:text-red-600" /> */}
          </motion.i>
        </div>
  
        {/* {alert && (
          <>
            {alert === "success" ? (
              <Toas msg={alertMsg} />
            ) : (
              <AlertError msg={alertMsg} />
            )}
          </>
        )} */}
      </motion.div>
    );
  };
  
  export default DashboardSongs;
  