import React from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import Header from "../header/Header";

export default function Login() {
  return (
    <div className="login">
      <Header />
      <div className="login_container">
        <div className="login_statements">
          <h1>login</h1>
          <h5>Create your own stories and adventure!!</h5>
        </div>
        <div className="login_forms">
          <form className="form Login-form">
            <div className="form-row">
              <label for="name" className="form-label">
                Email
              </label>
              <input type="email" id="email" className="form-input" />
            </div>

            <div className="form-row">
              <label for="price" className="form-label">
                Password
              </label>
              <input type="password" id="password" className="form-input" />
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
