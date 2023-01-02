import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import "../../assets/register.scss";
import {
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { registerSchema } from "./registerSchema";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateCurrentUser,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-hot-toast";

const defaultValues = {
  name: "",
  password: "",
  email: "",
  confirmPassword: "",
};

const Register = () => {
  const auth = getAuth();
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
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((user) => {
      updateProfile(user, { displayName: data.name });
      toast.success("User Registered Successfully");
        navigate("/login");
      })
      .catch((error) => {
        toast.error("user name or email is already taken");
      });
  };
 const handleVerify=()=>{
  
 }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Paper elevation={10} className="register_wrapper">
        <Avatar src="../images/logo.jpg" className="form_logo" />
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
        />{" "}
        <ReCAPTCHA
          sitekey="6Lern8IjAAAAACM_AdPtdM0JPcg7qOynqIQjT5Gd"
          onChange={handleVerify}
        />
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
