import { Typography, Box, useTheme } from "@mui/material";
import "../../../assets/AdminAssests/Header.scss";
import { useStateValue } from "../../../context/StateProvider";

const Header = ({ title, subtitle }) => {
  const [{background}, dispatch]= useStateValue();
  return (
    <Box className="Header-Component" id={background}>
      <div className="left-part">
        <Typography
          className="header-title"
          variant="h2"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
          id="text"
        >
          {title}
        </Typography>
        <Typography variant="h5" className="header-subtitle"  id="text">
          {subtitle}
        </Typography>
      </div>
    </Box>
  );
};

export default Header;
