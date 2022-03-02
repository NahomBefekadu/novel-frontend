import React from "react";
import "./Card.css";

export default function Card(data) {
  const { title, summary, author } = data;
  return (
    <div className="card">
      <div className="novel_card">
        <div className="card_content">
          <h4 className="card_title">{title}</h4>
          <h5 className="card_author">{author}</h5>
          <p className="card_summary">
            {summary}ipsum lorem ipsum lorem ipsum loremqsfadsfa sdfasdfasdf
            fsdafsdfasdf dfasfsdf fasdfasd sdfasdf
          </p>
          <a href="#" className="card_btn">
            Read More
          </a>
          <a href="#" className="card_btn">
            Add to favorites
          </a>
        </div>
      </div>
    </div>
  );
}
