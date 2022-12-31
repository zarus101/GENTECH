// import React from "react";

// import logo from "../../assets/Images/logo.jpg";
// import Avatar from "@mui/material/Avatar";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";

// import Grid from "@mui/material/AppBar";
// import Checkbox from "@mui/material/Checkbox";
// import FormControlLabel from "@mui/material/FormControlLabel";

// import { useForm } from "react-hook-form";

// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// <<<<<<< HEAD
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerSchema } from "./registerFormSchema";
// =======
// ========
// import { useState } from "react";
// import { useForm, Controller } from "react-hook-form";
// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
// import { yupResolver } from "@hookform/resolvers/yup";
// import { registerSchema } from "../../schema/formSchema";
// import { ErrorRounded } from "@mui/icons-material";
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
// import { useNavigate } from "react-router-dom";
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
// import { Paper } from "@mui/material";
// import "../../assets/register.scss";
// ========

// <<<<<<< HEAD
// =======
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
// <<<<<<< HEAD
// >>>>>>>> parent of 92eba3d (login and register error resolved):src/pages/RegisterForm.js

// =======
// <<<<<<<< HEAD:src/pages/RegisterForm.js
// >>>>>>>> parent of 92eba3d (login and register error resolved):src/pages/RegisterForm.js

// ========
// >>>>>>>> parent of 2243c02 (ssss):src/pages/register/RegisterForm.js
// >>>>>>> parent of 2243c02 (ssss)
// <<<<<<< HEAD
// =======
// ========

// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
// const defaultValues = {
//   name: "",
//   password: "",
//   email: "",
//   confirmPassword: "",
// };

// const Register = () => {
// <<<<<<< HEAD
//   const navigate = useNavigate();
// =======
//  const navigate=   useNavigate()
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm({
//     defaultValues,
//     resolver: yupResolver(registerSchema),
//   });

//   const formSubmitHandler = (data) => {
// <<<<<<< HEAD
//     navigate("/");
// =======
//     navigate('/')
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//     console.log(data);
//   };

//   return (
//     <form onSubmit={handleSubmit(formSubmitHandler)}>
//       <Paper elevation={10} className="register_wrapper">
//         <Avatar src={logo} className="form_logo" />
//         <h2>Sign Up</h2>

//         <Typography>Full Name</Typography>
//         <TextField
//           {...register("name")}
//           className="register_textfield"
//           variant="outlined"
// <<<<<<< HEAD
//           error={!!errors["name"]}
//           helperText={errors["name"]?.message}
//           fullWidth
//         />
//         <Typography>Email </Typography>
// =======
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
//           error={!!errors["name"]}
//           helperText={errors["name"]?.message}
// ========
//           style={textFieldStyle}
//           error={!!errors['name']}
//           helperText={errors['name']?.message}
// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
//           fullWidth
//         />
//         <Typography>Email Addressrefc</Typography>
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//         <TextField
//           {...register("email")}
//           className="register_textfield"
//           type="email"
//           variant="outlined"
// <<<<<<< HEAD
//           error={!!errors["email"]}
//           helperText={errors["email"]?.message}
// =======
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
//           error={!!errors["email"]}
//           helperText={errors["email"]?.message}
// ========
//           style={textFieldStyle}
//           error={!!errors['email']}
//           helperText={errors['email']?.message}
// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//           fullWidth
//         />
//         <Typography>Password</Typography>
//         <TextField
//           {...register("password")}
//           className="register_textfield"
//           type="password"
//           variant="outlined"
// <<<<<<< HEAD
//           error={!!errors["password"]}
//           helperText={errors["password"]?.message}
// =======
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
//           error={!!errors["password"]}
//           helperText={errors["password"]?.message}
// ========
//           style={textFieldStyle}
//           error={!!errors['password']}
//           helperText={errors['password']?.message}
// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//           fullWidth
//         />
//         <Typography>Confirm Password</Typography>
//         <TextField
//           {...register("confirmPassword")}
//           className="register_textfield"
//           type="password"
//           variant="outlined"
// <<<<<<< HEAD
//           error={!!errors["confirmPassword"]}
//           helperText={errors["confirmPassword"]?.message}
// =======
// <<<<<<<< HEAD:src/pages/register/RegisterForm.js
//           error={!!errors["confirmPassword"]}
//           helperText={errors["confirmPassword"]?.message}
// ========
//           style={textFieldStyle}
//           error={!!errors['confirmPassword']}
//           helperText={errors['confirmPassword']?.message}
// >>>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure):src/Pages/register/RegisterForm.js
// >>>>>>> parent of bd122aa (removed anti-patterns  and applied unified structure)
//           fullWidth
//         />
//         <Button type="submit"
//         className="register_button"
//         variant="contained"
//         fullWidth>
//           Register
//         </Button>
//         <Typography>
//           Do you Have an Account?
//           <Link href="#" underline="none">
//             Login
//           </Link>
//         </Typography>
//       </Paper>
//     </form>
//   );
// };

// export default Register;
