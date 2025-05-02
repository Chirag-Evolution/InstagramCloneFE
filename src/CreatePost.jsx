import React, { useState, useRef } from "react";
import "./CreatePost.css";
import axios, { AxiosHeaders } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export default function CreatePost() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let token = localStorage.getItem("token");
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handlePost = () => {
    if (!image || !caption) {
      alert("Please add an image and caption!");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "InstaClone");
    try {
      axios
        .post(
          "https://api.cloudinary.com/v1_1/dzvxqiwdx/image/upload",
          formData
        )
        .then((res) => {
          console.log(res.data.url);

          axios
            .post(
              `http://localhost:3000/posts/add`,
              { body: caption, image: res.data.url },
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            )
            .then((res) => {
              console.log(res);
              toast(res.data.msg);
              navigate("/home");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }

    // Simulate post upload

    // axios.post(`http://localhost:3000/posts/add`,{body:caption,image:image},
    //     {
    //         headers:{Authorization:`Bearer ${token}`},
    //     }
    // ).then((res)=>
    // {
    //     console.log(res);
    // }).catch(err=>console.log(err));

    // Reset after post
    setCaption("");
    setImage(null);
    setPreview(null);
  };

  return (
    <div className="create-post-container">
      <div className="create-post-card">
        <h2>Create New Post</h2>

        <div className="image-preview" onClick={triggerFileInput}>
          {preview ? (
            <img src={preview} alt="Preview" title="Click to replace image" />
          ) : (
            <label className="upload-label">
              <span className="upload-text">Click to upload image</span>
            </label>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
        </div>

        <textarea
          className="caption-input"
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        ></textarea>

        <button className="post-button" onClick={handlePost}>
          Share
        </button>
      </div>
    </div>
  );
}
