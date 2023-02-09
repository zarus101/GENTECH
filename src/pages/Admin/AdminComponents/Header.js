import { Typography, Box, useTheme } from "@mui/material";
import "../../../assets/AdminAssests/Header.scss";

const Header = ({ title, subtitle }) => {
  return (
    <Box className="Header-Component">
      <div className="left-part">
        <Typography
          className="header-title"
          variant="h2"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" className="header-subtitle">
          {subtitle}
        </Typography>
      </div>
    </Box>
  );
};

export default Header;