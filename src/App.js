import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/hero/Hero";
import Home from "./components/home/Home";
import Favorites from "./components/favorites/Favorites";
import Personal from "./components/personal/Personal";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Hero />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/favorites" element={<Favorites />}></Route>
          <Route path="/myBooks" element={<Personal />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
