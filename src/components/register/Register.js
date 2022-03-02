import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import axios from "axios";
import Header from "../header/Header";

export default function Register() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const rootUrl = "http://localhost:5000";
  //JSON.stringify(user)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) return;
    const user = { username: username, email: email, password: password };
    const user2 = { email: email, password: password };
    console.log(JSON.stringify(user));
    let bodyObj = JSON.stringify(user);
    let bodyObj2 = JSON.stringify(user2);
    try {
      const fetchurl = `${rootUrl}/api/v1/auth/register`;
      const request = await axios.post(fetchurl, bodyObj, {
        headers: {
          "Content-type": "application/json",
        },
      });

      const fetchurl2 = `${rootUrl}/api/v1/auth/login`;
      const request2 = await axios.post(fetchurl2, bodyObj2, {
        headers: {
          "Content-type": "application/json",
        },
      });

      localStorage.setItem("token", request2.data.userToken);
      localStorage.setItem("userID", request2.data.user.UserId);
      localStorage.setItem("userName", request2.data.user.username);
      setUserName("");
      setPassword("");
      setEmail("");
      console.log(request);
      console.log(request2);
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <Header />
      <div className="login_container">
        <div className="login_statements">
          <h1>Register</h1>
          <h5>Join our community and save your favorite stories!!</h5>
        </div>
        <div className="login_forms" onSubmit={handleSubmit}>
          <form className="form Login-form">
            <div className="form-row">
              <label className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="form-row">
              <label className="form-label">Email</label>
              <input
                type="email"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-row">
              <label className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-row">
              <button type="submit" className="btn btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
