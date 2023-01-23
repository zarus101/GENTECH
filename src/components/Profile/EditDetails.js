import React from "react";
import "../../assets/editDetails.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Typography, TextField, Button } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import {
  getCurrentUserDetail,
  updateUserDetails,
} from "../../connection/UserService";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function EditDetails() {
  const navigate = useNavigate("");
  const [id, setId] = useState();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState();
  const [loggedInUser, setLoggedInUser ]= useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    getCurrentUserDetail();
    console.log(getCurrentUserDetail());
    setToken(getCurrentUserDetail().token);
    setLoggedInUser(getCurrentUserDetail().user);
    console.log(token);
    setId(getCurrentUserDetail().user.id);
    console.log(id);
  }, []);

  const [data, setData] = useState({
    id: id,
    name: "",
    email: "",
  });

  const HandleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value, id: id });
  };

  const changeDetails = (e) => {
    e.preventDefault();
    console.log(data);
    updateUserDetails(data, token)
      .then((response) => {
        toast.success("successfully updated!!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ModeEditIcon />
        Edit Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <Typography>Full Name</Typography>
          <TextField
            className=""
            name="name"
            onChange={(e) => HandleChange(e, "name")}
            value={data.name}
            variant="outlined"
            fullWidth
          />
          <Typography>Email </Typography>
          <TextField
            className=""
            type="email"
            name="email"
            onChange={(e) => HandleChange(e, "email")}
            value={data.email}
            // placeholder={loggedInUser.email}

            variant="outlined"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={changeDetails}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
