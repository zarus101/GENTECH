import React from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const AddArtist = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  return (
    <>
      <Box m="20px">

        <form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="First Name"
              name="firstName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Last Name"
              name="lastName"
              sx={{ gridColumn: "span 2" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Email"
              name="email"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Contact Number"
              name="contact"
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Address 1"
              name="address1"
              sx={{ gridColumn: "span 4" }}
            />
            <Typography
              fullWidth
              sx={{ gridColumn: "span 4" }}
            >
              Artist Photo
            </Typography>
            <TextField
              fullWidth
      
              type="file"
              name="artistphoto"
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Create New Artist
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default AddArtist;
