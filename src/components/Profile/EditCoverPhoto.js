import React, { useState } from "react";
import "../../assets/editCover.scss";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Button } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

export default function EditCoverPhoto() {
  const [image, setImage] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.substring(0, 5) === image) {
      setImage(file);
    } else {
      setImage(null);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="cover-photo">
      
      <Button variant="" onClick={handleClickOpen}>
        <div className="cover-photo-icon">
        
        <PhotoCameraIcon />
        </div>
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Cover Photo</DialogTitle>
        <DialogContent>
          <input type="file" accept="/image/*" onClick={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
