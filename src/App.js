import "./assets/index.scss";
import Routes from "./Routes";
import "./firebase/config";
import { Toaster } from "react-hot-toast";


const App = () =>{
  return (
    <div className="app">
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes />;
  </div>
  );
};

export default App;
