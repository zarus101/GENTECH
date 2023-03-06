import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import sideNavbarData from "./data";
import "../../assets/NavbarSection.scss";
import "../../assets/Theme.scss";

import axios from "axios";
import {motion} from "framer-motion";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Delete, Edit } from "@mui/icons-material";
import { getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { toast } from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SideNavbar = ({ children, setTheme, theme }) => {
  // const [isOpen, setIsOpen] = useState(false);
  // const toggle = () => {
  //   setIsOpen(!isOpen);
  // };

  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [userid, setUserid] = useState();
  const [playlistName, setPlaylistName] = useState("");
  // const [updateName, setUpdateName] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = useState(false);
  // const [onOpen, setOnOpen] = useState(false);
  const handleOpen = () => {
    isLoggedIN() ? setOpen(true) : navigate("/login");
  };
  // const handleEditOpen = () => setOnOpen(true);
  const handleClose = () => setOpen(false);
  // const handleEditClose = () => setOnOpen(false);

  // const [isLoading, setIsLoading] = useState(true);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        axios
          .delete(`/v1/deletePlaylist/${id}`, config)
          .then((res) => toast.success("Playlist deleted!!"));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!isLoggedIN()) return;
    // console.log(isLoggedIN());

    getCurrentUserDetail();
    const id = getCurrentUserDetail().user.id;
    setUserid(id);
    setToken(getCurrentUserDetail().token);
  }, []);

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

    userid && fetchData();
    return () => controller?.abort();
    // setIsLoading(false);
  }, [userid, playlists]);

  const handleSubmit = async () => {
    const playlistData = {
      playlistName: playlistName,
      userID: userid,
    };

    try {
      const response = await axios.post(
        "/v1/createPlaylist",
        playlistData,
        config
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
    setPlaylistName("");
  };

  const handleClick = (id) => {
    navigate(`/playlist/${id}`);
  };

  return (
    <section className="main-section" id={theme}>
      <div className=" main-navbar" id="background">
        <div className="top-navbar">
          <ul>
            {sideNavbarData.topNav.map((item, index) => (
              <>
                <NavLink
                  to={item.path}
                  style={{ textDecoration: "none" }}
                  key={index}
                  activeclassname="active"
                >
                  <li className="nav-list" id="text">
                    <div className="icon">{item.icon}</div>
                    <div className="nav-item">{item.name}</div>
                  </li>
                </NavLink>
              </>
            ))}
          </ul>
        </div>

        <div className="nav-header">
          <h2>PLAYLISTS</h2>
        </div>
        <div className="bottom-navbar">
          <ul>
            <li className="nav-list" id="text" onClick={handleOpen}>
              <Button
                variant="outlined"
                className="nav-item"
                sx={{
                  color: "black",
                  fontWeight: "bolder",
                  p: "10px",
                  width: "100%",
                  mr: "2rem",
                }}
                id="text"
              >
                <AddBoxIcon sx={{ mr: "5px" }} />
                Create Playlist
              </Button>
            </li>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  <TextField
                    id="outlined-basic"
                    label="Name your playlist"
                    variant="outlined"
                    name="playlistName"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    sx={{ height: "50px", mt: "2px", ml: "10px" }}
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                </Typography>
              </Box>
            </Modal>
            {isLoggedIN() &&
              playlists.map((playlist, index) => (
                <motion.div
                initial={{ opacity: 0, translateY: -50 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ display: "flex", paddingRight: "4rem" }}
                  key={playlist.playlistID}
                >
                  <li
                    className="playlist-list"
                    id="text"
                    onClick={(e) => handleClick(playlist.playlistID)}
                  >
                    <div className="playlist-item">{playlist.name}</div>
                  </li>
                  <span>
                    <Delete
                      className="delete-icon"
                      onClick={() => handleDelete(playlist.playlistID)}
                    />
                  </span>
                </motion.div>
              ))}
          </ul>
        </div>
      </div>

      <div className="content-part" id="content">
        <div className="left-section"></div>
        <div className="right-section">{children}</div>
      </div>
    </section>
  );
};

export default SideNavbar;
