import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../header/Header";
import Loader from "../loader/Loader";
import "./Personal.css";
export default function Personal() {
  const [data, setData] = useState();
  const [view, setView] = useState("bks");
  const [bkid, setBkid] = useState();
  const [title, setTitle] = useState();
  const [summary, setSummary] = useState();
  const [author, setAuthor] = useState();
  const [genre, setGenre] = useState();
  const [imgPath, setImgPath] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = localStorage.getItem("userName");
  const currentUserID = localStorage.getItem("userID");
  const currentUserToken = localStorage.getItem("token");
  const rootUrl = "http://localhost:5000";
  const fetchurl = `${rootUrl}/api/v1/personal/${currentUserID}`;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const request = await axios.get(fetchurl, {
        headers: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
      console.log(request);
      setData(request.data.Books);
      if (data) {
        setIsLoading(false);
      }
      console.log(data);
      return request;
    }
    fetchData();
  }, []);

  const createBook = (e) => {
    e.preventDefault();
    setView("frms");
  };
  const handleSubmit = (e) => {
    // e.preventDefault();
    setView("bks");
    if (currentUserID) {
      const posturl = `${rootUrl}/api/v1/personal`;
      const bodyJS = {
        book_name: title,
        summary: summary,
        author: author,
        genre: genre,
        image: imgPath,
        user_id: currentUserID,
      };

      async function createNovel() {
        const request = await axios.post(posturl, bodyJS, {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        });
      }
      createNovel();
    } else {
      console.log("User is not logged in");
    }
  };
  const handleChange = (e) => {
    e.preventDefault();
    console.log("attached image");
    const imageFile = e.target.files[0];
    const formData = new FormData();
    formData.append("image", imageFile);
    console.log(imageFile);
    if (currentUserID) {
      const uploadImgurl = `${rootUrl}/api/v1/personal/img`;

      async function upldImage() {
        const request = await axios.post(uploadImgurl, formData, {
          headers: {
            Authorization: `Bearer ${currentUserToken}`,
          },
        });
        setImgPath(request.data.imagePath.src);
      }
      upldImage();
    } else {
      console.log("User is not logged in");
    }
  };
  const cancelSubmit = (e) => {
    e.preventDefault();
    setView("bks");
  };
  const createChapter = (e) => {
    e.preventDefault();
  };

  if (!currentUser) {
    return (
      <div className="personal">
        <Header />
        <div className="personal_container2">
          <div className="text">
            <h3>Please sign in to view your books</h3>
          </div>
          <div className="personal_container_img">
            <img className="personal_img" src="../../../image/book.svg" />
          </div>
        </div>
      </div>
    );
  }

  let myBk;
  const myBooks = () => {
    if (data) {
      myBk = data.map((novel) => (
        <div key={novel.book_id} className="novel_card">
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
          </div>
        </div>
      ));
    } else {
      myBk = <h3>You have not created any books</h3>;
    }
  };
  myBooks();
  return (
    <div className="personal">
      <Header />
      <div className="personal_container">
        <div className="personal_main">
          <div className="personal_main_text">
            <h1>Create</h1>
            <h5>Create your own stories and adventure!!</h5>
          </div>
          <div className="personal_main_ctrls">
            <button className="card_btn" onClick={(e) => createBook(e)}>
              Create a Book
            </button>
            <button className="card_btn" onClick={(e) => createChapter(e)}>
              Add a Chapter
            </button>
          </div>
        </div>
        <div className="personal_secondary">
          <div
            id="frm"
            className={view === "frms" ? "personal_form frms" : "personal_form"}
          >
            <form className="form create-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  id="title"
                  className="form-input"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Summary</label>
                <input
                  type="text"
                  id="summary"
                  className="form-input"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Author</label>
                <input
                  type="text"
                  id="Author"
                  className="form-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Genre</label>
                <input
                  type="text"
                  id="Genre"
                  className="form-input"
                  value={genre}
                  onChange={(e) => setGenre(e.target.value)}
                />
              </div>
              <div className="form-row">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  id="Image"
                  className="form-input"
                  accept="image/*"
                  onChange={(e) => handleChange(e)}
                />
              </div>
              <div className="form-row">
                <button type="submit" className="btn btn-block">
                  Submit
                </button>
                <button
                  type="button"
                  className="btn btn-block"
                  onClick={(e) => cancelSubmit(e)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div
            id="nvl"
            className={
              view === "bks" ? "personal_novels frms" : "personal_novels"
            }
          >
            <h3>My Books</h3>
            <div className="personal_novels_container">{myBk}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*

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
                  </div>
                </div>
              ))}

*/
