import React, { useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../header/Header";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const rootUrl = "http://localhost:5000";
  const currentUser = localStorage.getItem("userName");
  let navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const user = { email: email, password: password };
    console.log(JSON.stringify(user));
    let bodyObj = JSON.stringify(user);
    try {
      const fetchurl = `${rootUrl}/api/v1/auth/login`;
      const request = await axios.post(fetchurl, bodyObj, {
        headers: {
          "Content-type": "application/json",
        },
      });
      setPassword("");
      setEmail("");
      console.log(request);
      localStorage.setItem("token", request.data.userToken);
      localStorage.setItem("userID", request.data.user.UserId);
      localStorage.setItem("userName", request.data.user.username);
      navigate("../home", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };
  if (currentUser) {
    return (
      <div className="login">
        <Header />
        <div className="login_container2">
          <div className="text">
            <h4>You're already logged in!!</h4>
            <h5>Enjoy reading the many books we have in our collection</h5>
          </div>
          <div className="login_container_img">
            <img className="login_img" src="../../../image/stk.svg" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="login">
      <Header />
      <div className="login_container">
        <div className="login_statements">
          <h1>login</h1>
          <h5>Create your own stories and adventure!!</h5>
        </div>
        <div className="login_forms">
          <form className="form Login-form" onSubmit={handleSubmit}>
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
                Login
              </button>
            </div>
            <div className="btn-row">
              <Link to="/register">Register</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
