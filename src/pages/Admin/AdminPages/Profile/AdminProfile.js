import React, { useEffect, useState } from "react";
import ChangePassword from "../../../../components/Profile/ChangePassword";
import EditCoverPhoto from "../../../../components/Profile/EditCoverPhoto";
import EditDetails from "../../../../components/Profile/EditDetails";
import EditProfilePhoto from "../../../../components/Profile/EditProfilePhoto";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import ProfileTabs from "../../../Profile/Tabs";
import "../../assets/profile.scss";


const AdminProfile = () => {
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

        <div className="bottom-portion">
          <ProfileTabs />

          {/* <Container>
            <div className="tabs">
              <Button
                className={currentTab === "songs" ? "active" : ""}
                onClick={() => handleTabChange("songs")}
              >
                <AddCircleIcon />
                Liked Songs
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
              {currentTab === "songs" && (
                <div>
                  <AddSongs />
                </div>
              )}
              {currentTab === "subscriptions" && (
                <div>
                  <Subscribe />
                </div>
              )}
            </div>
          </Container> */}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
