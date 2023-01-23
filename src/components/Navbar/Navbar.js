import { Box, Button, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import "../../assets/NavbarSection.scss";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { NavLink, useNavigate } from "react-router-dom";
import { doLogout, getCurrentUserDetail, isLoggedIN } from "../../connection/UserService";
import { useState } from "react";
import { useEffect } from "react";

const Navbar = ({ theme, setTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);
 

  const navigate = useNavigate("");

  const logout = () => {
    doLogout(() => {
      navigate("/");
    });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box className="box" display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        // backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase
          id="background"
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search"
        />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon id="text" />
        </IconButton>
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
          <Typography id="text" className="user-name"><span className="wel">Welcome, </span>{getCurrentUserDetail().user.name}</Typography>

          </IconButton>

            <IconButton>
              <PersonOutlinedIcon id="text" />
            </IconButton>

            <IconButton
             onClick={handleMenu}
             className="icon">
              <SettingsOutlinedIcon id="text" />
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
               <NavLink to={"/profile"}><MenuItem >Profile</MenuItem></NavLink> 
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>

            <IconButton>
              <NotificationsOutlinedIcon id="text" />
            </IconButton>

            
          </>
        )}

        <IconButton
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "dark" ? (
            <DarkModeOutlinedIcon id="text" />
          ) : (
            <LightModeOutlinedIcon id="text" />
          )}
        </IconButton>
      </Box>
    </Box>
  );
};

export default Navbar;
