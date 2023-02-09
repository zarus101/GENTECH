import React, { useState, useEffect } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";

const UpdateUser = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState("");

  const { id } = useParams();
  const Navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(`/v1/singleuser/${id}`)
      .then((res) => setInputs(res.data[0]));
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = {
      name: inputs.name,
      email: inputs.email,
      password: inputs.password,
      userProfilePhoto: file,
      role: inputs.role,
    };

    // console.log(artistData);

    axios
      .put(`/v1/updateUser/${id}`, userData, config)
      .then((res) => console.log(res.data));

    alert("Successful");
    Navigate("/userlist");
  };

  return (
    <>
      <Box m="20px">
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            {/* <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Artist ID"
              name="artistID"
              value={inputs.artistID || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 2" }}
            /> */}
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="User Name"
              name="name"
              value={inputs.name || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              multiline
              variant="filled"
              type="email"
              label="User Email"
              name="email"
              value={inputs.email || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="password"
              name="password"
              value={inputs.password || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />

            <Typography fullWidth sx={{ gridColumn: "span 4" }}>
              User Profile Photo
            </Typography>
            <TextField
              type="file"
              name="userProfilePhoto"
              onChange={handleFile}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              variant="filled"
              type="text"
              label="role"
              name="role"
              value={inputs.role || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button type="submit" color="secondary" variant="contained">
              Save
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
};

export default UpdateUser;
