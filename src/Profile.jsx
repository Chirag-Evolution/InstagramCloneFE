import React, { useEffect, useState } from "react";
import "./Profile.css";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  let token = localStorage.getItem("token");
  let user = localStorage.getItem("user");
  let userData = JSON.parse(user);
  const [postLength, setPostLength] = useState();
  const [postData, setPostData] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const [selectedPost, setSelectedPost] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };
  const handleUpload = () => {
    if (!file) return alert("No file selected");
    const formData = new FormData();
    formData.append("file", file);
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
            .put(
              "http://localhost:3000/register/uploadProfile",
              {
                pic: res.data.url,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => console.log(res))
            .catch((err) => console.log(err));
        });
    } catch (err) {}
  };
  const handleImageClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  const handleDelete = () => {
    console.log("Delete post:", selectedPost);
    axios
      .delete(`http://localhost:3000/posts/deletePost/${selectedPost.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        toast("Post Deleted successfully");
      })
      .catch((err) => console.log(err));
    handleCloseModal();
  };
  useEffect(() => {
    axios
      .get(`http://localhost:3000/posts/userposts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPostLength(res.data.length);
        const data = res.data.map((item) => {
          return { id: item._id, photo: item.photo };
        });
        console.log("data", data);
        setPostData(data);
      })
      .catch((err) => console.log(err));
  }, [selectedPost]);

  useEffect(() => {
    console.log("Updated postData:", postData);
  }, [postData]);

  return (
    <div className="profile-page">
      {/* Profile Header */}
      <div className="profile-header">
        <div className="profile-pic">
          <img
            src={userData.profilePhoto}
            alt="Profile"
            className="profile-img"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
        </div>
        {/* <div>
          <input
            type="file"
            className="form-control-sm"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button className="btn btn-primary" onClick={handleUpload}>
            Upload Profile Photo
          </button>
        </div> */}
        <div className="profile-details">
          <div className="row">
            <div className="col">
              <h1 className="username">{userData.name}</h1>
            </div>
            <div className="col"></div>
          </div>
          <div className="stats">
            <span className="stat">
              <strong>{postLength}</strong> Posts
            </span>
            <span className="stat">
              <strong>1.2k</strong> Followers
            </span>
            <span className="stat">
              <strong>380</strong> Following
            </span>
          </div>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>
      <div>
        <input
          type="file"
          className="form-control-sm"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="btn btn-primary" onClick={handleUpload}>
          Upload Profile Photo
        </button>
      </div>

      {/* Profile Bio */}
      <div className="profile-bio">
        <p className="bio">
          <strong>Ramesh</strong> Software Engineer | Coffee Lover | Traveler
        </p>
      </div>

      {/* Posts Grid */}
      {/* <div className="posts-grid">
       

        {postData &&
          postData.length > 0 &&
          postData.map((element, index) => (
            <div
              className="post"
              key={index}
              onClick={() => handleImageClick(element)}
            >
              <img
                src={element.photo}
                alt={`Post ${index + 1}`}
                className="post-img"
              />
            </div>
          ))}
      </div> 
*/}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          //justifyContent: "center",
          padding: "20px",
        }}
      >
        {postData &&
          postData.length > 0 &&
          postData.map((element, index) => (
            <div
              key={index}
              onClick={() => handleImageClick(element)}
              style={{
                width: "200px",
                height: "200px",
                overflow: "hidden",
                borderRadius: "10px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={element.photo}
                alt={`Post ${index + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}
      </div>

      {/* Modal */}
      {selectedPost && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={handleCloseModal}
        >
          <div
            style={{
              position: "relative",
              backgroundColor: "#fff",
              padding: "24px",
              borderRadius: "12px",
              maxWidth: "95vw",
              maxHeight: "95vh",
              boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
              overflow: "hidden",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedPost.photo}
              alt="Enlarged"
              style={{
                width: "100%",
                height: "auto",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: "10px",
                display: "block",
              }}
            />
            <button
              onClick={handleDelete}
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                backgroundColor: "#e63946",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "20px",
                border: "none",
                borderRadius: "50%",
                width: "36px",
                height: "36px",
                cursor: "pointer",
                lineHeight: "36px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
              }}
              title="Delete Post"
            >
              <i className="fa fa-trash" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
