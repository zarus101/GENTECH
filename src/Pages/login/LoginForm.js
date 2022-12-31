// import React from "react";
// import "../../assets/login.scss";
// import Avatar from "@mui/material/Avatar";
// import TextField from "@mui/material/TextField";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
// import Paper from "@mui/material/Paper";

// import AutorenewIcon from "@mui/icons-material/Autorenew";
// import logo from "../../assets/Images/logo.jpg";
// import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import { loginSchema } from "./loginFormSchema";
// import { useNavigate } from "react-router-dom";

// // import Avatar from "@mui/material/Avatar";
// // import TextField from "@mui/material/TextField";
// // import Checkbox from "@mui/material/Checkbox";
// // import FormControlLabel from "@mui/material/FormControlLabel";
// // import Button from "@mui/material/Button";
// // import Typography from "@mui/material/Typography";
// // import Link from "@mui/material/Link";
// // import AutorenewIcon from "@mui/icons-material/Autorenew";
// // // import logo from "../../assets/Images/logo.jpg";
// // import { useForm } from "react-hook-form";
// // import { yupResolver } from "@hookform/resolvers/yup";

// // import { useNavigate } from "react-router-dom";
// // import { Paper } from "@mui/material";

// // const defaultValues = {
// //   email: "",
// //   password: "",
// // };

// // const Login = () => {
// //   const navigate = useNavigate();
// //   const {
// //     register,
// //     handleSubmit,
// //     formState: { errors },
// //   } = useForm({
// //     defaultValues,
// //     resolver: yupResolver(loginSchema),
// //   });

//   return (
//     <form onSubmit={handleSubmit(formSubmitHandler)}>
//       <Paper elevation={10} className="login_wrapper">
//         <Avatar src={logo} className="form_logo" />
//         <h2>Sign In</h2>

// //   const [checked, setChecked] = React.useState(true);
// //   const handleChange = (event) => {
// //     setChecked(event.target.checked);
// //   };

// //   return (
// //     <form onSubmit={handleSubmit(formSubmitHandler)}>
// //       <Paper elevation={10} className="login_wrapper">
// //         <Avatar src={logo} className="form_logo"/>
// //         <h2>Sign In</h2>

//         <FormControlLabel
//           control={<Checkbox checked={checked} onChange={handleChange} />}
//           label="Remember me"
//         />
//         <Typography>Enter Captcha:</Typography>
//         <TextField
//           variant="outlined"
//           style={{ width: "42%", margin: "5px" }}
//         ></TextField>
//         <TextField
//           variant="outlined"
//           style={{ width: "42%", margin: "5px" }}
//         ></TextField>
//         <AutorenewIcon style={{ marginTop: "25px" }} />
//         <Button
//           type="submit"
//           variant="contained"
//           className="login_button"
//           fullWidth
//         >
//           Login
//         </Button>
//         <Typography>
//           <Link href="#" underline="none">
//             Forgot Password?
//           </Link>
//         </Typography>
//         <Typography>
//           Do you Have an Account?
//           <Link href="#" underline="none">
//             Register
//           </Link>
//         </Typography>
//       </Paper>
//     </form>
//   );
// };

// //         <Typography>Password</Typography>
// //         <TextField
// //           {...register("password")}
// //           variant="outlined"
// //           className="login_textfield"
// //           error={!!errors["password"]}
// //           helperText={errors["password"]?.message}
// //           fullWidth
// //         />

// //         <FormControlLabel
// //           control={<Checkbox checked={checked} onChange={handleChange} />}
// //           label="Remember me"
// //         />
// //         <Typography>Enter Captcha:</Typography>
// //         <TextField
// //           variant="outlined"
// //           style={{ width: "42%", margin: "5px" }}
// //         ></TextField>
// //         <TextField
// //           variant="outlined"
// //           style={{ width: "42%", margin: "5px" }}
// //         ></TextField>
// //         <AutorenewIcon style={{ marginTop: "25px" }} />
// //         <Button
// //           type="submit"
// //           variant="contained"
// //           className="login_button"
// //           fullWidth>
// //           Login
// //         </Button>
// //         <Typography>
// //           <Link href="#" underline="none">
// //             Forgot Password?
// //           </Link>
// //         </Typography>
// //         <Typography>
// //           Do you Have an Account?
// //           <Link href="#" underline="none">
// //             Register
// //           </Link>
// //         </Typography>
// //       </Paper>
// //     </form>
// //   );
// // };

// // export default Login;
