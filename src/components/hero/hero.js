import React from "react";
import "./Hero.css";
export default function Hero() {
  return (
    <div className="hero">
      <div className="hero_container">
        <div className="hero_container_text">
          <h5>Explore Fantasies and Adventure</h5>
          <h1>NovelLite</h1>
          <p>
            You can create your own stories, be the hero of your own adventure.
            Take others with you on your journey as writer. Or read the many
            stories submitted by our users.
          </p>
        </div>
        <div className="hero_container_img">
          <img className="hero_img" src="../../../image/test2.svg" />
        </div>
      </div>
    </div>
  );
}
