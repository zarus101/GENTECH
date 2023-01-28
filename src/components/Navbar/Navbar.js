import { Box, Button, IconButton } from "@mui/material";
import InputBase from "@mui/material/InputBase";
import "../../assets/NavbarSection.scss";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { NavLink, useNavigate } from "react-router-dom";

import { doLogout, isLoggedIN } from "../../connection/UserService";


const Navbar = ({ theme, setTheme }) => {

  const navigate = useNavigate("");

  const logout = () => {
    doLogout(() => {
      navigate("/");
    });
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
            <NavLink to={"/login"}>
              <Button className="btn">Sign IN</Button>
            </NavLink>
            <NavLink to={"/register"}>
              <Button className="btn">Sign UP</Button>
            </NavLink>
          </>
        )}
        {isLoggedIN() === true && (
          <>
            <IconButton>
              <PersonOutlinedIcon id="text" />
            </IconButton>

            <IconButton className="icon">
              <SettingsOutlinedIcon id="text" />
            </IconButton>
            <IconButton>
              <NotificationsOutlinedIcon id="text" />
            </IconButton>

            <Button onClick={logout}>Logout</Button>
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
