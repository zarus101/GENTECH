import { Box, Typography } from "@mui/material";
import "../../../assets/AdminAssests/StatBox.scss";
const StatBox = ({ title, subtitle, icon, progress, increase }) => {
  return (
    <Box className="main-box" width="100%" m="0 30px">
      <Box className="box-1" display="flex" justifyContent="space-between">
        <Box className="mini-box" display="flex">
          <div className="icon">{icon}</div>

          <Typography
            className="title"
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#e0e0e0 ", ml: "50px" }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-between" mt="2px">
        <Typography variant="h5" sx={{ color: "#4cceac" }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
