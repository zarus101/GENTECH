import React from "react";

import {
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import "../../assets/login.scss";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { doLogin, loginUser } from "../../connection/UserService";

const Login = () => {
  const navigate = useNavigate();
  const [loginDetail, setLoginDetail] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event, field) => {
    setLoginDetail({
      ...loginDetail,
      [field]: event.target.value,
    });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (loginDetail.username === "" || loginDetail.password === "") {
      toast.error("username and password is required");
      return;
    }

    loginUser(loginDetail)
      .then((data) => {
        console.log(data);
        doLogin(data, () => {
          console.log(data);
          if(data.user.role==="admin"){
            navigate("/admin/dashboard")
          }else{
            navigate('/')
          } 
  
        });
      })
      .catch((error) => {
        console.log("error");
        toast.error("something went wrong in server");
      });
  };

  return (
    <form className="form" onSubmit={handleSubmitForm}>
      <Paper elevation={10} className="login_wrapper">
        <Avatar src="../images/logo.jpg" className="form_logo" />
        <h2>Sign In</h2>

        <Typography>Email Address</Typography>
        <TextField
          type="email"
          name="email"
          value={loginDetail.email}
          onChange={(e) => handleChange(e, "email")}
          variant="outlined"
          className="login_textfield"
          fullWidth
        />

        <Typography>Password</Typography>
        <TextField
          type="password"
          name="password"
          onChange={(e) => handleChange(e, "password")}
          value={loginDetail.password}
          variant="outlined"
          className="login_textfield"
          fullWidth
        />

        <FormControlLabel control={<Checkbox />} label="Remember me" />
        <Button
          type="submit"
          variant="contained"
          className="login_button"
          fullWidth
        >
          Login
        </Button>
        <Typography>
          <Link href="#" underline="none">
            Forgot Password?
          </Link>
        </Typography>
        <Typography>
          Do you Have an Account?
          <Link href="../register" underline="none">
            Register
          </Link>
        </Typography>
      </Paper>
    </form>
  );
};

export default Login;
