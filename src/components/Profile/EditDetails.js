import React from "react";
import "../../assets/editDetails.scss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {
    Typography,
    TextField,
    Button,
  } from "@mui/material";


export default function EditDetails() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
      <ModeEditIcon/>
      Edit Details
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Details</DialogTitle>
        <DialogContent>
          <Typography>Full Name</Typography>
        <TextField
          className=""
          variant="outlined"
          fullWidth
        />
        <Typography>Email </Typography>
        <TextField
          className=""
          type="email"
          variant="outlined"
          fullWidth
        />
        <Typography>New Password</Typography>
        <TextField
          className=""
          type="password"
          variant="outlined"
          fullWidth
        />
        <Typography>Confirm Password</Typography>
        <TextField
          className=""
          type="password"
          variant="outlined"
          fullWidth
        />{" "}
         <Typography>Add Bio</Typography>
        <TextField
          className=""
          variant="outlined"
          fullWidth
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
