import React, { useState } from "react";
import "./PostCard.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router";

const PostCard = ({ posts }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [comment, setComment] = useState("");
  const [showCommentsModal, setShowCommentsModal] = useState(false);
  const id = user.id;
  console.log(id);

  const saveComment = (e, id) => {
    e.preventDefault();
    console.log(comment);
    axios
      .put(
        `http://localhost:3000/posts/comment`,
        { postId: id, text: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        toast("comment posted");
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  const likePost = (id) => {
    axios
      .put(
        `http://localhost:3000/posts/likes`,
        { postId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const unLikePost = (id) => {
    axios
      .put(
        `http://localhost:3000/posts/unlike`,
        { postId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        // {
        //   body: { postId: id },
        // }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    // <div className="container my-3">
    <div className="card shadow-sm">
      <div className="card-header d-flex align-items-center bg-white">
        <h5 className="mb-0">
          <img
            src={posts.photo}
            alt="User profile"
            className="rounded-circle"
            style={{ width: "50px", height: "40px" }}
          />
          <Link to={`/profile/${posts?.postedby?._id}`}>
            {posts.postedby?.name}
          </Link>
        </h5>
      </div>

      {/* Post Image */}
      <img src={posts.photo} alt="Post" className="card-img-top" />

      {/* Content */}
      <div className="card-body">
        {posts.likes?.includes(id) ? (
          <span
            className="material-icons me-3"
            role="button"
            style={{ color: "red" }}
            onClick={() => unLikePost(posts._id)}
          >
            favorite
          </span>
        ) : (
          <span
            className="material-icons"
            role="button"
            type="button"
            onClick={() => {
              likePost(posts._id);
            }}
          >
            favorite_border
          </span>
        )}

        <p className="mb-1">
          <strong>{posts.likes?.length} likes</strong>
        </p>
        <p> {posts.body}</p>
        <p
          className="text-sm text-blue-500 cursor-pointer"
          onClick={() => setShowCommentsModal(true)}
        >
          View all {posts.comments?.length} comments
        </p>
      </div>

      {/* {showCommentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-4 max-w-md w-full rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold">Comments</h2>
              <button
                onClick={() => setShowCommentsModal(false)}
                style={{
                  backgroundColor: "red",
                  fontSize: "6px",
                  border: "none",
                }}
              >
                <i className="fa fa-times" aria-hidden="true"></i>
              </button>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {posts.comments.map((comment, index) => (
                <p key={index}>
                  <strong>{comment.postedBy}:</strong> {comment.comment}
                </p>
              ))}
            </div>
          </div>
        </div>
      )} */}

      {/* Comment Input */}
      <div className="card-footer d-flex align-items-center bg-white">
        <span className="material-icons me-2">mood</span>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => saveComment(e, posts._id)}
        >
          Post
        </button>
      </div>

      {showCommentsModal && (
        <div
          style={{
            backgroundColor: "white",
            padding: "16px",
            // maxWidth: "400px",
            width: "100%",
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "12px",
            }}
          >
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "bold",
                color: "#333",
              }}
            >
              Comments
            </h2>
            <button
              onClick={() => setShowCommentsModal(false)}
              style={{
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "4px 8px",
                borderRadius: "50%",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </div>

          <div
            style={{
              maxHeight: "320px",
              overflowY: "auto",
            }}
          >
            {posts.comments.map((comment, index) => (
              <p
                key={index}
                style={{
                  fontSize: "10px",
                  color: "#555",
                  marginBottom: "8px",
                }}
              >
                <strong>{comment.postedBy.name}</strong>: {comment.comment}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>

    // {/* </div> */}
  );
};
export default PostCard;
