import React from "react";
<<<<<<<< HEAD:src/pages/register/RegisterForm.js
import logo from "../../assets/Images/logo.jpg";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useForm } from "react-hook-form";
========
import logo from "../../Assets/Images/logo.jpg";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
>>>>>>>> parent of 92eba3d (login and register error resolved):src/pages/RegisterForm.js
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "./registerFormSchema";
import { useNavigate } from "react-router-dom";
<<<<<<<< HEAD:src/pages/register/RegisterForm.js
import { Paper } from "@mui/material";
import "../../assets/register.scss";
========

<<<<<<<< HEAD:src/pages/RegisterForm.js
>>>>>>>> parent of 92eba3d (login and register error resolved):src/pages/RegisterForm.js

========
>>>>>>>> parent of 2243c02 (ssss):src/pages/register/RegisterForm.js
const defaultValues = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const formSubmitHandler = (data) => {
    navigate("/");
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Paper elevation={10} className="register_wrapper">
        <Avatar src={logo} className="form_logo" />
        <h2>Sign Up</h2>

        <Typography>Full Name</Typography>
        <TextField
          {...register("name")}
          className="register_textfield"
          variant="outlined"
          error={!!errors["name"]}
          helperText={errors["name"]?.message}
          fullWidth
        />
        <Typography>Email </Typography>
        <TextField
          {...register("email")}
          className="register_textfield"
          type="email"
          variant="outlined"
          error={!!errors["email"]}
          helperText={errors["email"]?.message}
          fullWidth
        />
        <Typography>Password</Typography>
        <TextField
          {...register("password")}
          className="register_textfield"
          type="password"
          variant="outlined"
          error={!!errors["password"]}
          helperText={errors["password"]?.message}
          fullWidth
        />
        <Typography>Confirm Password</Typography>
        <TextField
          {...register("confirmPassword")}
          className="register_textfield"
          type="password"
          variant="outlined"
          error={!!errors["confirmPassword"]}
          helperText={errors["confirmPassword"]?.message}
          fullWidth
        />
        <Button type="submit" 
        className="register_button"
        variant="contained" 
        fullWidth>
          Register
        </Button>
        <Typography>
          Do you Have an Account?
          <Link href="#" underline="none">
            Login
          </Link>
        </Typography>
      </Paper>
    </form>
  );
};

export default Register;
