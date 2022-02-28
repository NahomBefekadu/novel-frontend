import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { links } from "../../utility/helper";
export default function Header() {
  const openSidebar = () => {};

  return (
    <div className="header">
      <div className="header_container">
        <div className="header_logo">
          <Link to="/">
            <img className="header_logoImg" src="../../../image/logo.svg" />
          </Link>
        </div>
        <button type="button" className="nav-toggle" onClick={openSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <ul className="header_links">
          {links.map((link) => {
            const { id, text, url } = link;
            return (
              <li key={id}>
                <Link to={url}>{text}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
