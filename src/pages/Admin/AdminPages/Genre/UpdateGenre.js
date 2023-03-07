import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { getCurrentUserDetail } from "../../../../connection/UserService";
import { toast } from "react-hot-toast";

const UpdateGenre = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [inputs, setInputs] = useState({});

  const { id } = useParams();
  const Navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    getCurrentUserDetail();
    setToken(getCurrentUserDetail().token);
  }, []);

  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios.get(`/v1/getSingleGenre/${id}`).then((res) => setInputs(res.data[0]));
  }, [id]);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
    console.log(inputs);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const genreData = {
      genreName: inputs.genreName,
      Description: inputs.Description,
    };

    console.log(genreData);

    axios
      .put(`/v1/updateGenre/${id}`, genreData, config)
      .then((res) => console.log(res.data));

    toast.success("Successful");
    Navigate("/genrelist");
  };

  return (
    <>
      <Box m="20px 20px 200px 20px">
        <form onSubmit={handleSubmit}>
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
              label="Genre Name"
              name="genreName"
              value={inputs.genreName || ""}
              onChange={handleChange}
              sx={{ gridColumn: "span 4" }}
            />
            <TextField
              multiline
              variant="filled"
              type="text"
              label="Description"
              rows={4}
              name="Description"
              value={inputs.Description || ""}
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

export default UpdateGenre;
