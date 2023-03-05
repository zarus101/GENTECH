import React, { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import "../assets/index.scss";
import "../assets/NavbarSection.scss";
import { useState } from "react";
import AdminSidebar from "../pages/Admin/global/AdminSidebar";
import { getAllArtists } from "../connection/ArtistService";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import FixFooter from "../Footer/FixFooter";

const AdminLayout = ({ children }) => {
  const [{isSongPlaying }, dispatch] = useStateValue();
  const [theme, setTheme] = useState("light");
  const [isSidebar] = useState(true);

  useEffect(() => {
    getAllArtists().then((data) => {
      dispatch({
        type: actionType.SET_ALL_ARTISTS,
        allArtists: data,
      });
    });
  }, []);

  return (
    <div className="app">
      <AdminSidebar theme={theme} setTheme={setTheme} isSidebar={isSidebar}>
        <Navbar theme={theme} setTheme={setTheme} />
        {children}

        {isSongPlaying && (
          <div>
            <FixFooter />
          </div>
        )}
      </AdminSidebar>
    </div>
  );
};

export default AdminLayout;
