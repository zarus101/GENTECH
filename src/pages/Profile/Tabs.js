import { ImageList, ImageListItem, Typography } from "@mui/material";
import { useState } from "react";
import AddSongs from "../../components/Profile/AddSongs";
import Subscribe from "../../components/Profile/Subscribe";
import "../../assets/ProfileTabs.scss";
import AddCircleIcon from "@mui/icons-material/AddCircle";

function ProfileTabs({ children }) {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          <AddCircleIcon />
          <h1> Liked Songs</h1>
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          <h1> Subscribed Songs</h1>
        </button>
        {/* <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Photos
        </button> */}
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <AddSongs />
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <Subscribe />
        </div>

        {/* <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          
        </div> */}
      </div>
    </div>
  );
}

export default ProfileTabs;
