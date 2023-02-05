import React, { useEffect, useState } from "react";
import "../../assets/editProfilePhoto.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import {
  getCurrentUserDetail,
  updateProfilePhoto,
} from "../../connection/UserService";
import { toast } from "react-hot-toast";

export default function EditProfilePhoto() {
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = useState("");
  const [userId, serUserId] = useState();
  const [file, setFile] = useState("");

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    getCurrentUserDetail();
    console.log(getCurrentUserDetail());
    setToken(getCurrentUserDetail().token);
    serUserId(getCurrentUserDetail().user.id);
  }, []);

  const changeDetails = (e) => {
    e.preventDefault();
    const userData = {
      userId: userId,
      userProfilePhoto: file,
    };

    updateProfilePhoto(userData, token)
      .then((response) => {
        console.log(userData);

        toast.success("successfully added!!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="profile-photo">
      <Button variant="" onClick={handleClickOpen}>
        <div className="profile-photo-icon">
          <PhotoCameraIcon className="icon" />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Profile Picture</DialogTitle>
        <DialogContent>
          <input type="file" name="userProfilePhoto"  onChange={handleFile} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={changeDetails}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
