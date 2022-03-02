import React from "react";
import "./Loader.css";
export default function Loader() {
  return (
    <div className="globe">
      <div className="globe___container">
        <div className="circle">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <h2 className="globe__text">Loading ...</h2>
      </div>
    </div>
  );
}
