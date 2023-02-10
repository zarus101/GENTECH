import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import LibraryMusicOutlinedIcon from "@mui/icons-material/LibraryMusicOutlined";
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import MusicVideoOutlinedIcon from "@mui/icons-material/MusicVideoOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AudioFileOutlinedIcon from "@mui/icons-material/AudioFileOutlined";
const sideNavbar = {
  topNav: [
    {
      path: "/",
      name: "Home",
      icon: <HomeOutlinedIcon />,
    },
    {
      path: "/browse",
      name: "Browse",
      icon: <ListAltOutlinedIcon />,
    },
    // {
    //   path: "/search",
    //   name: "Search",
    //   icon: <SearchIcon />,
    // },
    // {
    //   path: "/album",
    //   name: "Album",
    //   icon: <LibraryMusicOutlinedIcon />,
    // },
    {
      path: "/artists",
      name: "Artists",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      path: "/genre",
      name: "Genre",
      icon: <MusicVideoOutlinedIcon />,
    },
  ],

  myMusic: [
    {
      // path:'/favourites',
      name: "Recently Played",
      icon: <AccessTimeOutlinedIcon />,
    },
    {
      // path:'/favourites',
      name: "Local Files",
      icon: <AudioFileOutlinedIcon />,
    },
  ],

  playlist: [
    {
      // path:'/favourites',
      name: "General Playlist",
      icon: <MusicVideoOutlinedIcon />,
    },
    {
      // path:'/favourites',
      name: "Ease up beats",
      icon: <MusicVideoOutlinedIcon />,
    },
    {
      // path:'/favourites',
      name: "Pop songs",
      icon: <MusicVideoOutlinedIcon />,
    },
    {
      // path:'/favourites',
      name: "Mood swings",
      icon: <MusicVideoOutlinedIcon />,
    },
  ],
};

export default sideNavbar;
