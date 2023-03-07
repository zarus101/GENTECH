import { Box, Icon } from "@mui/material";
import React, { useEffect } from "react";
import StatBox from "../../AdminComponents/StatPage";

import Header from "../../AdminComponents/Header";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LyricsIcon from "@mui/icons-material/Lyrics";

import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";
import "../../../../assets/AdminAssests/Dashboard.scss";

import { getAllMusic } from "../../../../connection/MusicService";
import { getAllArtists } from "../../../../connection/ArtistService";
import { getAllUsers } from "../../../../connection/UserService";
import { useStateValue } from "../../../../context/StateProvider";
import { actionType } from "../../../../context/reducer";
import { motion } from "framer-motion";
export const DashnoardCard = ({ icon, name, count }) => {
  return (
    <div className="dashboard_card">
      {icon}
      <p className="dash_text">{name}</p>
      <p className="dash_sub_text">{count}</p>
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate("");
  const [{ allUsers, allSongs, allArtists, background }, dispatch] =
    useStateValue([]);

  useEffect(() => {
    if (!allUsers) {
      getAllUsers().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_USERS,
          allUsers: data,
        });
      });
    }

    if (!allSongs) {
      getAllMusic().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_SONGS,
          allSongs: data,
        });
      });
    }

    if (!allArtists) {
      getAllArtists().then((data) => {
        console.log(data);
        dispatch({
          type: actionType.SET_ALL_ARTISTS,
          allArtists: data,
        });
      });
    }
  }, []);

  return (
    <>
      <Box className="main-box" m="20px" id={background}>
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>
        <motion.div
          initial={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="main-div">
            <DashnoardCard
              icon={<PeopleOutlinedIcon />}
              name={"Users"}
              count={allUsers && allUsers.length > 0 ? allUsers.length : 0}
            />
            <DashnoardCard
              icon={<PeopleOutlinedIcon className="text-3xl text-textColor" />}
              name={"Artists"}
              count={
                allArtists && allArtists.length > 0 ? allArtists.length : 0
              }
            />
            <DashnoardCard
              icon={<LyricsIcon />}
              name={"Songs"}
              count={allSongs && allSongs.length > 0 ? allSongs.length : 0}
            />
          </div>
        </motion.div>
      </Box>
    </>
  );
};

export default Dashboard;
