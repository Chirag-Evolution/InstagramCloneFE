import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router";
import axios from "axios";
import PostCard from "./PostCard";

export default function Home() {
  const [postData, setPostData] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
    const logged = localStorage.getItem("logged");
    const token = localStorage.getItem("token");
    if (!logged) {
      navigate("/signin");
    }
    axios
      .get(`http://localhost:3000/posts/posts`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setPostData(res.data);
        console.log(res.data);
      });
  }, []);
  return (
    <div className="home">
      <div className="container">
        <div className="row">
          {postData.map((posts) => {
            return (
              <div
                key={posts._id}
                className="flex flex-col items-center space-y-4"
              >
                <PostCard posts={posts}></PostCard>{" "}
              </div>
            );
          })}
        </div>
        {/* <div className="card">
  
    <div className="card-header">
      <div className="card-pic">
        <img src="https://via.placeholder.com/42" alt="User profile" />
      </div>
      <h5>Ramesh</h5>
    </div>

   
    <div className="card-image">
      <img src="https://via.placeholder.com/600x400?text=Post+Image" alt="Post" />
    </div>

   
    <div className="card-content">
     
      <span className="material-icons icon">favorite_border</span>
      <span className="material-icons icon">comment</span>
      <span className="material-icons icon">share</span>

      <p className="likes">1 like</p>
      <p><strong>Ramesh</strong> This is amazing!</p>
    </div>

  
    <div className="add-comment">
      <span className="material-icons">mood</span>
      <input type="text" placeholder="Add a comment..." />
      <button className="post-btn">Post</button>
    </div>
    </div> */}
      </div>
    </div>
  );
}
