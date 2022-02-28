import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/favorites" element={<About />}></Route>
          <Route path="/myBooks" element={<Projects />}></Route>
          <Route path="/login" element={<Skills />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
