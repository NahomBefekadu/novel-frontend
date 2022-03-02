import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import "./Favorites.css";
export default function Favorites() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = localStorage.getItem("userName");
  const currentUserID = localStorage.getItem("userID");
  const currentUserToken = localStorage.getItem("token");
  const rootUrl = "http://localhost:5000";
  const fetchurl = `${rootUrl}/api/v1/fav/${currentUserID}`;

  useEffect(() => {
    console.log("here");
    if (currentUser) {
      async function fetchData() {
        setIsLoading(true);
        const request = await axios.get(fetchurl, {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        });
        setData(request.data.Books);
        if (data) {
          setIsLoading(false);
        }
        return request;
      }
      fetchData();
    }
  }, [fetchurl]);
  console.log(data);

  const removeFromFav = (id, e, index) => {
    console.log(e.target);
    e.preventDefault();

    if (currentUserID) {
      const deleteurl = `${rootUrl}/api/v1/fav/${id}`;

      async function deleteData() {
        const request = await axios.delete(deleteurl, {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        });
      }
      deleteData();
      window.location.reload();
    } else {
      console.log("User is not logged in");
    }
    console.log(data);
    //setData(data.splice(index, 1));
  };
  if (!currentUser) {
    return (
      <div className="favorites">
        <Header />
        <div className="favorites_container2">
          <div className="text">
            <h3>Please sign in to view your favorites</h3>
          </div>
          <div className="favorites_container_img">
            <img
              className="hero_img"
              src="../../../image/Glowillustration.svg"
            />
          </div>
        </div>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="favorites">
        <Header />
        <div className="favorites_container3">
          <div className="text">
            <h3>You have not added any books to your favorites</h3>
          </div>
          <div className="favorites_container_img">
            <img className="hero_img" src="../../../image/Group 2.svg" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites">
      <Header />
      <div className="favorites_container">
        <div className="favorites_novels">
          {data.map((novel, index) => (
            <div key={novel.book_id} className="novel_card">
              <div key={novel.book_id} className="card_content">
                <h4 className="card_title">{novel.book_name}</h4>
                <h5 className="card_author">{novel.author}</h5>
                <p className="card_summary">
                  {novel.summary}ipsum lorem ipsum lorem ipsum loremqsfadsfa
                  sdfasdfasdf fsdafsdfasdf dfasfsdf fasdfasd sdfasdf
                </p>
                <button className="card_btn">Read More</button>
                <button
                  className="card_btn"
                  onClick={(e) => removeFromFav(novel.fav_id, e, index)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
