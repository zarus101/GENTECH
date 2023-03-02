import React, { useState } from "react";
import "../../assets/register.scss";
import "../../assets/captcha.scss";

import {
  Typography,
  Paper,
  Avatar,
  TextField,
  Button,
  Link,
} from "@mui/material";

// import { toast } from "react-hot-toast";
import { signUP } from "../../connection/UserService";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "./registerSchema";
import { toast } from "react-hot-toast";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import AutorenewIcon from "@mui/icons-material/Autorenew";

const Register = () => {
  const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const complexityRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
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
    }
    if (!data.name || !data.email || !data.password || !data.password_confirm) {
      toast.error("All fields are required");
      return;
    }
    if (!emailRegex.test(data.email)) {
      toast.error("Invalid email format");
      return;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (data.password !== data.password_confirm) {
      toast.error("Passwords do not match");
      return;
    }
    if (!complexityRegex.test(data.password)) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      );
      return;
    } 
    if (cap !== captcha1) {
      toast.error("Invalid Captcha");
      return;
    } 
    else {
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

  const [captcha1, setCaptcha1] = useState("");
  const [cap, setCap] = useState("1F@we$");

  const handleAutoRenew = () => {
    var a = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "!",
      "@",
      "#",
      "$",
      "%",
      "&",
      "@",
      "#",
      "$",
      "%",
      "&",
    ];
    var newCap = "";
    for (var i = 1; i <= 6; i++) {
      var r = Math.floor(Math.random() * 62);
      newCap = newCap + a[r];
    }
    setCap(newCap);
  };



  return (
    <form validationSchema={registerSchema} onSubmit={handleSubmit}>
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
        <div className="captcha">
          <TextField className="captcha_code" variant="filled" value={cap} />

          <TextField
            className="captcha_text"
            value={captcha1}
            onChange={(e) => setCaptcha1(e.target.value)}
          />
          <div className="icons">
            <AutorenewIcon onClick={handleAutoRenew} />
          </div>
        </div>
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
