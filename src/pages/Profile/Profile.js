import React, { useEffect, useState } from "react";
import "../../assets/profile.scss";
import EditDetails from "../../components/Profile/EditDetails";
import EditCoverPhoto from "../../components/Profile/EditCoverPhoto";

import EditProfilePhoto from "../../components/Profile/EditProfilePhoto";
import { getCurrentUserDetail } from "../../connection/UserService";
import ChangePassword from "../../components/Profile/ChangePassword";
import ProfileTabs from "./Tabs";

const Profile = () => {
  // const [auth, user] = getAuth();
  const [user, setUser] = useState("");

  useEffect(() => {
    console.log(setUser(getCurrentUserDetail().user));
  }, []);

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

          <div className="flex">
            <div className="user-profile-image">
              <img
                id="pp-img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkkVsRNVJ7O7xNGK7IXtRwchi4NsKzUUdPMMcmIdbDKH_x6DKXR2EQGWrBiM8KKga7Ey0&usqp=CAU"
                alt=""
                srcSet=""
              />
              <EditProfilePhoto />
            </div>

            <div className="detail-portion">
              <div className="left-side">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>

              <div className="right-side">
                <EditDetails />
              </div>
              <div className="side">
                <ChangePassword />
              </div>
            </div>
          </div>
        </div>

        {getCurrentUserDetail().user.role ===
          "normal" ? (
            <div className="bottom-portion">
              <ProfileTabs />
            </div>
          ):(
            <div></div>
          )}
      </div>
    </div>
  );
};

export default Profile;
