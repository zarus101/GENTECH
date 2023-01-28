import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import "../../assets/register.scss";
import {
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
} from "@mui/material";

// import { registerSchema } from "./registerSchema";
// // import {
// //   createUserWithEmailAndPassword,
// //   getAuth,
// //   updateCurrentUser,
// //   updateProfile,
// // } from "firebase/auth";
import { toast } from "react-hot-toast";
import Captcha from "./Captcha";

// import { toast } from "react-hot-toast";
import { signUP } from "../../connection/UserService";
// import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate("");
  const [error, setError] = useState({
    isError: false,
  });

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirm: "",
  });

  const handleChange = (event, property) => {
    setData({ ...data, [property]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (error.isError) {
      toast.error("form data is invalid");
      return;
    } else {
      signUP(data)
        .then((resp) => {
          toast.success("registered Successfully");
          setData({
            name: "",
            email: "",
            password: "",
            password_confirm: "",
          });
          navigate("/login");
        })
        .catch((error) => {
          setError(true);
          toast.error("error");
        });
    }
  };

  // const formSubmitHandler = (data) => {
  //   createUserWithEmailAndPassword(auth, data.email, data.password)
  //     .then((user) => {
  //       updateProfile(user, { displayName: data.name });
  //       toast.success("User Registered Successfully");
  //       navigate("/login");
  //     })
  //     .catch((error) => {
  //       toast.error("user name or email is already taken");
  //     });
  // };

  return (
    <form onSubmit={handleSubmit}>
      <Paper elevation={10} className="register_wrapper">
        <Avatar src="../images/logo.jpg" className="form_logo" />
        <h2>Sign Up</h2>
        <Typography>Full Name</Typography>
        <TextField
          name="name"
          type="text"
          value={data.name}
          onChange={(e) => handleChange(e, "name")}
          className="register_textfield"
          variant="outlined"
          fullWidth
        />
        <Typography>Email </Typography>
        <TextField
          name="email"
          value={data.email}
          onChange={(e) => handleChange(e, "email")}
          className="register_textfield"
          type="email"
          variant="outlined"
          fullWidth
        />
        <Typography>Password</Typography>
        <TextField
          name="password"
          value={data.password}
          onChange={(e) => handleChange(e, "password")}
          className="register_textfield"
          type="password"
          variant="outlined"
          fullWidth
        />
        <Typography>Confirm Password</Typography>
        <TextField
          name="password_confirm"
          value={data.password_confirm}
          onChange={(e) => handleChange(e, "password_confirm")}
          className="register_textfield"
          type="password"
          variant="outlined"
          fullWidth
        />{" "}
        <Typography>Enter Captcha </Typography>
        <Captcha />
        <Button
          type="submit"
          className="register_button"
          variant="contained"
          fullWidth
        >
          Register
        </Button>
        <Typography>
          Do you Have an Account?
          <Link href="../login" underline="none">
            Login
          </Link>
        </Typography>
      </Paper>
    </form>
  );
};

export default Register;
