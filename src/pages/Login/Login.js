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
import { useForm } from "react-hook-form";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./loginSchema";
import { useNavigate } from "react-router-dom";
import "../../assets/login.scss";
import { toast } from "react-hot-toast";
import { useState } from "react";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [isLoggedIN, setIsLoggedIN]= useState(false)
  const auth = getAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const formSubmitHandler = (data) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        toast.success("Logged In Successfully");
        setIsLoggedIN(true)
        navigate("/");
      })
      .catch((error) => {
        toast.error("Please enter valid username and password");
      });
  };

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <form className="form" onSubmit={handleSubmit(formSubmitHandler)}>
      <Paper elevation={10} className="login_wrapper">
        <Avatar src="../images/logo.jpg" className="form_logo" />
        <h2>Sign In</h2>

        <Typography>Email Address</Typography>
        <TextField
          {...register("email")}
          variant="outlined"
          className="login_textfield"
          error={!!errors["email"]}
          helperText={errors["email"]?.message}
          fullWidth
        />

        <Typography>Password</Typography>
        <TextField
          {...register("password")}
          variant="outlined"
          className="login_textfield"
          error={!!errors["password"]}
          helperText={errors["password"]?.message}
          fullWidth
        />

        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Remember me"
        />
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
