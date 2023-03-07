import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LyricsIcon from "@mui/icons-material/Lyrics";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import "../../../assets/AdminAssests/AdminSidebar.scss";
import { useStateValue } from "../../../context/StateProvider";

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const AdminSidebar = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const [{background}, dispatch]= useStateValue();

  return (
    <>
      <section className="main-section" id={background}>
        <div
          className=" main-navbar"
          style={{ width: isCollapsed ? "10%" : "25%" }}
         
        >
          <Box className="main-box"  id="background">
            <ProSidebar collapsed={isCollapsed}>
              <Menu iconShape="square">
                {/* LOGO AND MENU ICON */}
                <MenuItem
                  onClick={() => setIsCollapsed(!isCollapsed)}
                  icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                >
                  {!isCollapsed && (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      ml="15px"
                    >
                      <Typography variant="h5"   id="text">ADMIN</Typography>
                      <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                        <MenuOutlinedIcon id='text' />
                      </IconButton>
                    </Box>
                  )}
                </MenuItem>
                <Box
                  className="nav-lists"
                  width={isCollapsed ? undefined : "20%"}
                >
                  <Item
                    title="Dashboard"
                    to="/admin/dashboard"
                    icon={<HomeOutlinedIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  
                  />

                  <Typography
                    variant="h6"
                    sx={{ m: "15px 0 5px 20px" }}
                    style={{
                      fontSize: isCollapsed ? "10px" : "20px",
                      paddingRight: isCollapsed ? "20px" : "0px",
                    }}
                    id="text"
                  >
                    Data
                  </Typography>
                  <Item
                    title="Manage Artists"
                    to="/artistslist"
                    icon={<PeopleOutlinedIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Manage Users"
                    to="/userlist"
                    icon={<ContactsOutlinedIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Manage Songs"
                    to="/songs"
                    icon={<MusicNoteIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Manage Genres"
                    to="/genrelist"
                    icon={<LyricsIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Typography
                    variant="h6"
                    sx={{ m: "15px 0 5px 20px" }}
                    style={{
                      fontSize: isCollapsed ? "10px" : "20px",
                      paddingRight: isCollapsed ? "20px" : "0px",
                    }}
                    id="text"
                  >
                    Pages
                  </Typography>
                  <Item
                    title="Add Artist"
                    to="/addartist"
                    icon={<PersonOutlinedIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Add Songs"
                    to="/addsongs"
                    icon={<LibraryMusicIcon   id="text"/>}
                    selected={selected}
                    setSelected={setSelected}
                  />

                  <Item
                    title="Add Genres"
                    to="/addgenre"
                    icon={<LyricsIcon   id="text"/>}
                    selected={selected}
                    setSelected={setSelected}
                  />
                  <Item
                    title="Calendar"
                    to="/calendar"
                    icon={<CalendarTodayOutlinedIcon  id="text" />}
                    selected={selected}
                    setSelected={setSelected}
                  />
                </Box>
              </Menu>
            </ProSidebar>
          </Box>
        </div>

        <div className="content-part" id="content">
          <div
            className="left-section"
            style={{ width: isCollapsed ? "10%" : "25%" }}
          ></div>
          <div
            className="right-section"
            style={{ width: isCollapsed ? "90%" : "75%" }}
          >
            {children}
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminSidebar;
