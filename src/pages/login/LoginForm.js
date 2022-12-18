import React from "react";
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Link,
} from "@material-ui/core";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import logo from "../../Assets/Images/logo.jpg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schema/loginFormSchema";
import { useNavigate } from "react-router-dom";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate=  useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema ),
  });

  const formSubmitHandler = (data) => {
    console.log(data);
    navigate('/')
  };

  const [checked, setChecked] = React.useState(true);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 350,
    margin: "20px auto",
  };
  const textFieldStyle = { margin: "10px 0" };
  const loginBtnStyle = {
    margin: "8px 0",
    backgroundColor: "#DC4D2E",
    color: "#fff",
  };

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Paper elevation={10} style={paperStyle}>
        <Grid align="center">
          <Avatar src={logo} />
          <h2>Sign In</h2>
        </Grid>
        <Typography>Email Address</Typography>
        <TextField
          {...register("email")}
          variant="outlined"
          style={textFieldStyle}
          error={!!errors["email"]}
          helperText={errors["email"]?.message}
          fullWidth
        />

        <Typography>Password</Typography>
        <TextField
          {...register("password")}
          variant="outlined"
          style={textFieldStyle}
          error={!!errors["password"]}
          helperText={errors["password"]?.message}
          fullWidth
        />

        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label="Remember me"
        />
        <Typography>Enter Captcha:</Typography>
        <TextField
          variant="outlined"
          style={{ width: "42%", margin: "5px" }}
        ></TextField>
        <TextField
          variant="outlined"
          style={{ width: "42%", margin: "5px" }}
        ></TextField>
        <AutorenewIcon style={{ marginTop: "25px" }} />
        <Button
          type="submit"
          variant="contained"
          style={loginBtnStyle}
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
          <Link href="#" underline="none">
            Register
          </Link>
        </Typography>
      </Paper>
    </form>
  );
};

export default Login;
