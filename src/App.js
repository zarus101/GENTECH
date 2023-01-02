import "./assets/index.scss";
import Routes from "./Routes";
import "./firebase/config";
import { Toaster } from "react-hot-toast";
import { useState } from "react";




const App = () =>{

const [theme , setTheme]= useState("light")
  return (
    <div className="app">
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes theme={theme} setTheme={setTheme} />;
  </div>
  );
};

export default App;
