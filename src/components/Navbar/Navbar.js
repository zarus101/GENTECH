import { Box, Button, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
// import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import "../../assets/NavbarSection.scss";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Topbar = ({ theme, setTheme }) => {
  const [isLoggedIN, setIsLoggedIN] = useState(false);
  //   const theme = useTheme();
  //   const colors = tokens(theme.palette.mode);
  //   const colorMode = useContext(ColorModeContext);

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
        {!isLoggedIN && (
          <>
            <NavLink to={"/login"}><Button className="btn">Sign IN</Button></NavLink>
            <NavLink to={"/register"}><Button className="btn">Sign UP</Button></NavLink>
            
          </>
        )}

        {isLoggedIN && (
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

export default Topbar;
