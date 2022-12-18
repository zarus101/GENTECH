import React from "react";
import logo from "../../Assets/Images/logo.jpg";
import Grid from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../../schema/formSchema";
import { ErrorRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Paper } from "@mui/material";


const defaultValues = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const Register = () => {
 const navigate=   useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const formSubmitHandler = (data) => {
    navigate('/')
    console.log(data);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const textFieldStyle = { margin: "10px 0" };
  const BtnStyle = {
    margin: "8px 0",
    backgroundColor: "#DC4D2E",
    color: "#fff",
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar src={logo} />
          <h2>Sign Up</h2>
        </Grid>
        <Typography>Full Name</Typography>
        <TextField
          {...register("name")}
          variant="outlined"
          style={textFieldStyle}
          error={!!errors['name']}
          helperText={errors['name']?.message}
          fullWidth
        />
        <Typography>Email Addressrefc</Typography>
        <TextField
          {...register("email")}
          type="email"
          variant="outlined"
          style={textFieldStyle}
          error={!!errors['email']}
          helperText={errors['email']?.message}
          fullWidth
        />
        <Typography>Password</Typography>
        <TextField
          {...register("password")}
          type="password"
          variant="outlined"
          style={textFieldStyle}
          error={!!errors['password']}
          helperText={errors['password']?.message}
          fullWidth
        />
        <Typography>Confirm Password</Typography>
        <TextField
          {...register("confirmPassword")}
          type="password"
          variant="outlined"
          style={textFieldStyle}
          error={!!errors['confirmPassword']}
          helperText={errors['confirmPassword']?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" style={BtnStyle} fullWidth>
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
