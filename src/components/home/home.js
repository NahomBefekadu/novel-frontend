import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../card/Card";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import "./Home.css";
export default function Home() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = localStorage.getItem("userName");
  const currentUserID = localStorage.getItem("userID");
  const currentUserToken = localStorage.getItem("token");
  const rootUrl = "http://localhost:5000";
  const fetchurl = `${rootUrl}/api/v1/book`;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const request = await axios.get(fetchurl);
      setData(request.data.Books);
      if (data) {
        setIsLoading(false);
      }
      return request;
    }
    fetchData();
  }, [fetchurl]);

  const addToFav = (id, e) => {
    e.preventDefault();
    if (currentUserID) {
      const posturl = `${rootUrl}/api/v1/fav/${currentUserID}`;
      const bodyJS = {
        book: id,
      };
      async function fetchData() {
        const request = await axios.post(posturl, bodyJS, {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        });
      }
      fetchData();
    } else {
      console.log("User is not logged in");
    }
  };

  console.log(data);

  if (!data) {
    return (
      <div className="home">
        <Loader />
      </div>
    );
  }

  return (
    <div className="home">
      <Header />
      <div className="home_container">
        <div className="home_search">
          <h5>{currentUser ? `Welcome ${currentUser}` : null}</h5>
          <h4>Search</h4>
        </div>
        <div className="home_novels">
          {data.map((novel) => (
            <div
              key={novel.book_id}
              className="novel_card"
              style={{ backgroundImage: `url(${novel.image})` }}
            >
              <div className="card_content">
                <h4 className="card_title">{novel.book_name}</h4>
                <h5 className="card_author">{novel.author}</h5>
                <p className="card_summary">
                  {novel.summary}ipsum lorem ipsum lorem ipsum loremqsfadsfa
                  sdfasdfasdf fsdafsdfasdf dfasfsdf fasdfasd sdfasdf
                </p>
                <button className="card_btn">Read More</button>
                <button
                  className="card_btn"
                  onClick={(e) => addToFav(novel.book_id, e)}
                >
                  Add to favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
//<div className="Home__Loader">{isLoading ? <Globe /> : null}</div>
/*----------------------------------------------------------------
 {data.map((novel) => (
            <Card
              title={novel.book_name}
              author={novel.author}
              summary={novel.summary}
            />
          ))}



          {data.map((novel) => (
            <div className="novel_card">
              <div className="card_content">
                <h4 className="card_title">{novel.book_name}</h4>
                <h5 className="card_author">{novel.author}</h5>
                <p className="card_summary">
                  {novel.summary}ipsum lorem ipsum lorem ipsum loremqsfadsfa
                  sdfasdfasdf fsdafsdfasdf dfasfsdf fasdfasd sdfasdf
                </p>
                <a href="#" className="card_btn">
                  Read More
                </a>
                <a href="#" className="card_btn">
                  Add to favorites
                </a>
              </div>
            </div>
          ))}
          */
