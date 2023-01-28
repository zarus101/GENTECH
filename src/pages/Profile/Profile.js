import React, { useState } from "react";
import "../../assets/profile.scss";
import EditDetails from "../../components/Profile/EditDetails";
import EditCoverPhoto from "../../components/Profile/EditCoverPhoto";
import Subscribe from "../../components/Profile/Subscribe";
import AddSongs from "../../components/Profile/AddSongs";
import EditProfilePhoto from "../../components/Profile/EditProfilePhoto";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import { Button } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Container } from "@mui/system";
import userEvent from "@testing-library/user-event";
import { getAuth } from "firebase/auth";



const Profile = () => {
  // const [auth, user] = getAuth();
  const [currentTab, setCurrentTab] = useState("songs");
   
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="top-portion">
          <div className="user-profile-bg-image">
            <img
            id="bg-img"
            src="https://img.freepik.com/free-photo/maple-leaf-border-background-orange-watercolor-autumn-season_53876-128735.jpg?w=2000"
            alt=""
            srcSet=""
          />
            <EditCoverPhoto />
          </div>
          <div className="user-profile-image">
            <img
              id="pp-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkkVsRNVJ7O7xNGK7IXtRwchi4NsKzUUdPMMcmIdbDKH_x6DKXR2EQGWrBiM8KKga7Ey0&usqp=CAU"
              alt=""
              srcSet=""
            />
            <EditProfilePhoto/>
          </div>
        
        <div className="detail-portion">
          <div className="left-side">
            {/* <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.bio}</p> */}
          </div>
          <div className="right-side">
            <EditDetails />
          </div>
        </div>
      </div>
      </div>
      <div className="bottom-portion">
      <Container>
      <div className="tabs">
        <Button
          className={currentTab === "songs" ? "active" : ""}
          onClick={() => handleTabChange("songs")}
        >
          <AddCircleIcon />
          Songs
        </Button>
        <Button
          className={currentTab === "subscriptions" ? "active" : ""}
          onClick={() => handleTabChange("subscriptions")}
        >
          <SubscriptionsIcon />
          Subscriptions
        </Button>
      </div>
      <div className="tab-content">
        {currentTab === "songs" && 
        <div>
          <AddSongs/>
        </div>}
        {currentTab === "subscriptions" && 
        <div>
          <Subscribe/>
        </div>}
      </div>
    </Container>

          
      </div>
    </div>
  );
};

export default Profile;
