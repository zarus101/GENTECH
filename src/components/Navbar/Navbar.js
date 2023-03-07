import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import InputBase from "@mui/material/InputBase";
import "../../assets/NavbarSection.scss";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import CancelIcon from "@mui/icons-material/Cancel";
import { motion } from "framer-motion";
import {
  doLogout,
  getCurrentUserDetail,
  isLoggedIN,
} from "../../connection/UserService";
import { useEffect, useState } from "react";
import { getAllArtists } from "../../connection/ArtistService";
import { getAllMusic } from "../../connection/MusicService";
import { useStateValue } from "../../context/StateProvider";
import { actionType } from "../../context/reducer";
import SongComments from "../Song/SongComment";
const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [artists, setArtists] = useState("");
  const [searchItem, setSearchItem] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [songs, setSongs] = useState("");
  const [{ user, background }, dispatch] = useStateValue();
  const [open, setOpen] = useState(false);
  const [selectedSongId, setSelectedSongId] = useState(null);

  const handleOpenComments = (songId) => {
    setSelectedSongId(songId);
    setOpen(true);
  };

  const handleChange = (event) => {
    setSearchItem(event.target.value);
    setShowResults(!!event.target.value);
  };
  const navigate = useNavigate("");
  const logout = () => {
    doLogout(() => {
      navigate("/");
    });
  };

  useEffect(() => {
    console.log(user);
    getAllArtists()
      .then((data) => {
        setArtists(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });

    getAllMusic()
      .then((data) => {
        setSongs(data);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClose = () => {
    setAnchorEl(null);
    setSearchItem("");
    setOpen(false);
  };
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (artistID, e) => {
    e.preventDefault();
    navigate(`/artist/${artistID}`);
  };

  const lightButtonClick = () => {
    dispatch({
      type: actionType.SET_BACKGROUND,
      background: "dark",
    });
  };
  const darkButtonClick = () => {
    dispatch({
      type: actionType.SET_BACKGROUND,
      background: "light",
    });
  };
  return (
    <Box className="box" display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="3px"
        className="top-bar"
      >
        <InputBase
          id="background"
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
          onChange={handleChange}
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon id="text" />
        </IconButton>

        {showResults && searchItem && (
          <div className="search-box">
            <div className="cancel">
              <CancelIcon onClick={handleClose} />
            </div>
            <div className="artist-section">
              <div className="header">
                <Typography> Artists:</Typography>
              </div>
              {artists
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.artistName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value, index) => {
                  return (
                    <motion.div
                      initial={{ opacity: 0, translateY: -50 }}
                      animate={{ opacity: 1, translateY: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="artists"
                      onClick={(e) => handleClick(value.artistID, e)}
                    >
                      <div className="artist-pic">
                        <img src={`/public/img/artist/${value.artistPhoto}`} />
                      </div>
                      <div className="artist-name">
                        <h3>{value.artistName}</h3>
                      </div>
                    </motion.div>
                  );
                })}
              {artists.filter((item) => {
                if (searchItem === "") {
                  return item;
                } else if (
                  item.artistName
                    .toLowerCase()
                    .includes(searchItem.toLowerCase())
                ) {
                  return item;
                }
              }).length === 0 && (
                <div className="artists">
                  <Typography>No Artist Found</Typography>
                </div>
              )}
            </div>
            <div className="song-section">
              <div className="header">
                <Typography> Songs:</Typography>
              </div>
              {songs
                .filter((value) => {
                  if (searchItem === "") {
                    return value;
                  } else if (
                    value.songName
                      .toLowerCase()
                      .includes(searchItem.toLowerCase())
                  ) {
                    return value;
                  }
                })
                .map((value) => {
                  return (
                    <div className="songs" onClick={() => handleOpenComments(value.songID)}>
                      <div className="songs-pic">
                        <img src={`/public/img/artist/${value.songPhoto}`} />
                      </div>
                      <div className="songs-name">
                        <h3>{value.songName}</h3>
                      </div>
                    </div>
                  );
                })}
              {songs.filter((item) => {
                if (searchItem === "") {
                  return item;
                } else if (
                  item.songName.toLowerCase().includes(searchItem.toLowerCase())
                ) {
                  return item;
                }
              }).length === 0 && (
                <div className="songs">
                  <Typography>No song Found</Typography>
                </div>
              )}
            </div>
          </div>
        )}
        {open && (
          <SongComments
            open={open}
            selectedSongId={selectedSongId}
            handleClose={handleClose}
          />
        )}
      </Box>

      {/* ICONS */}
      <Box display="flex">
        {isLoggedIN() === false && (
          <>
            <NavLink className="link" to={"/login"}>
              <Button className="btn">Sign IN</Button>
            </NavLink>
            <NavLink className="link" to={"/register"}>
              <Button className="btn">Sign UP</Button>
            </NavLink>
          </>
        )}
        {isLoggedIN() === true && (
          <>
            <IconButton>
              <Typography
                id="text"
                className="user-name"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <span className="wel">Welcome, </span>
                {getCurrentUserDetail().user?.name}
              </Typography>
            </IconButton>

            <NavLink to={"/profile"}>
              <IconButton>
                <PersonOutlinedIcon id="text" />
              </IconButton>
            </NavLink>

            <IconButton onClick={handleMenu} className="icon">
              <SettingsOutlinedIcon id="text" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <NavLink to={"/profile"}>
                <MenuItem>Profile</MenuItem>
              </NavLink>
              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </>
        )}

        <IconButton

        // onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {background === "dark" ? (
            < LightModeOutlinedIcon id="text" onClick={() => darkButtonClick()} />
          ) : (
            <DarkModeOutlinedIcon
              id="text"
              onClick={() => lightButtonClick()}
            />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
