
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home';
import Login from './pages/login/LoginForm';
import Register from './pages/register/RegisterForm';

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}

export default App;
