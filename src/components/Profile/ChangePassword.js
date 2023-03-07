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
  userChangePassword,
} from "../../connection/UserService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function ChangePassword() {
  const [id, setId] = useState();

  const navigate = useNavigate("");
  const [token, setToken] = useState();

  const [open, setOpen] = React.useState(false);
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
    console.log(token);
    setId(getCurrentUserDetail().user.id);
    console.log(id);
  }, []);

  const [data, setData] = useState({
    id: id,
    password: "",
    password_confirm: "",
  });

  const HandleChange = (e) => {
    const value = e.target.value;
    setData({ ...data, [e.target.name]: value, id: id });
  };

  const changePassword = (e) => {
    e.preventDefault();
    console.log(data);
    userChangePassword(data, token)
      .then((response) => {
        console.log(response.data)
        if(response.data.status==="failed"){
          toast.error(response.data.message)
        } else if(response.data.status==="success"){
          toast.success(response.data.message)
        }

      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <ModeEditIcon />
        Change Password
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          <Typography>New Password</Typography>
          <TextField
            type="password"
            name="password"
            onChange={(e) => HandleChange(e, "password")}
            value={data.password}
            variant="outlined"
            className="login_textfield"
            fullWidth
          />
          <Typography>Confirm Password</Typography>
          <TextField
            type="password"
            name="password_confirm"
            value={data.password_confirm}
            onChange={(e) => HandleChange(e, "password_confirm")}
            variant="outlined"
            placeholder="Confirm Password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            type="submit"
            onClick={changePassword}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
