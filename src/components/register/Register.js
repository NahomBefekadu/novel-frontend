import React from "react";
import "./Register.css";
import Header from "../header/Header";

export default function Register() {
  return (
    <div className="register">
      <Header />
      <div className="login_container">
        <div className="login_statements">
          <h1>Register</h1>
          <h5>Join our community and save your favorite stories!!</h5>
        </div>
        <div className="login_forms">
          <form className="form Login-form">
            <div className="form-row">
              <label for="price" className="form-label">
                Username
              </label>
              <input type="text" id="username" className="form-input" />
            </div>
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
              <button type="button" className="btn btn-block">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
