import { Box, Button } from "@mui/material";
import React from "react";
import StatBox from "../../AdminComponents/StatPage";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Header from "../../AdminComponents/Header";
import TrafficIcon from "@mui/icons-material/Traffic";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LyricsIcon from "@mui/icons-material/Lyrics";

import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

  const navigate= useNavigate('')
  return (
    <>
      <Box m="20px">
        {/* HEADER */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* ROW 1 */}
          <Box
            gridColumn="span 3"
            backgroundColor="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={navigate("/userlist")}
          >
            <StatBox
              title="hhhhh"
              subtitle="No of Users"
              progress="0.75"
              increase="+14%"
              icon={<PeopleOutlinedIcon sx={{ color: "black", fontSize: "50px" }} />}
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={navigate("/artistslist")}
           
          >
            <StatBox
              title="431,225"
              subtitle="NO of Artists"
              progress="0.50"
              increase="+21%"
              icon={
                <PersonOutlinedIcon sx={{ color: "black", fontSize: "50px" }} />
              }
            />
          </Box>
          <Box
            gridColumn="span 3"
            backgroundColor="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            onClick={navigate("")}
          >
            <StatBox
              title="32,441"
              subtitle="No of Songs"
              progress="0.30"
              increase="+5%"
              icon={
                <LyricsIcon sx={{ color: "black", fontSize: "50px" }} />
              }
            />
          </Box>
          {/* <Box
            gridColumn="span 3"
            backgroundColor="#1F2A40"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title="1,325,134"
              subtitle="Traffic Received"
              progress="0.80"
              increase="+43%"
              icon={<TrafficIcon sx={{ color: "#3da58a", fontSize: "26px" }} />}
            />
          </Box> */}

          {/* ROW 2 */}
        
        </Box>
      </Box>
    </>
  );
};

export default Dashboard;
