import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function UserProfile() {
  const { id } = useParams();
  const [userData, setUserData] = useState();
  const [postData, setPostData] = useState();
  const [isFollow, setIsfollow] = useState(false);
  let token = localStorage.getItem("token");
  let user = JSON.parse(localStorage.getItem("user"));
  let userId = user._id;
  console.log(userId);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/register/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.user);
        setPostData(res.data.post);
        if (res.data.user.followers.includes(userId)) {
          setIsfollow(true);
        }
        if (res.data.user.following.incldes(userId)) {
          setIsfollow(false);
        }
      })
      .catch((err) => console.log(err));
  }, [isFollow]);

  const followUser = (id) => {
    axios
      .put(
        `http://localhost:3000/register/follow`,
        { followId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // headers
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsfollow(true);
      })
      .catch((err) => console.log(err));
    console.log("foolo", id);
  };

  const unFollow = (id) => {
    axios
      .put(
        `http://localhost:3000/register/unfollow`,
        { followId: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // headers
          },
        }
      )
      .then((res) => {
        console.log(res);
        setIsfollow(false);
      })
      .catch((err) => console.log(err));
    console.log("foolo", id);
  };
  return (
    <div className="m-5">
      <div className="profile-header">
        <div className="profile-pic">
          <img
            src={userData.profilePhoto}
            alt="Profile"
            className="profile-img"
          />
        </div>
        <div className="profile-details">
          <div className="row">
            <div className="col">
              <h1 className="username">{userData?.name}</h1>
            </div>
            <div className="col">
              <button
                className="btn btn-outline-primary float-right"
                onClick={() => {
                  if (isFollow) {
                    unFollow(userData._id);
                  } else {
                    followUser(userData._id);
                  }
                }}
              >
                {isFollow ? "Unfollow" : "Follow"}
              </button>
            </div>
          </div>
          <div className="stats">
            <span className="stat">
              <strong>{postData?.length}</strong> Posts
            </span>
            <span className="stat">
              <strong>{userData?.followers?.length}</strong> Followers
            </span>
            <span className="stat">
              <strong>{userData?.following?.length}</strong> Following
            </span>
          </div>
          <button className="edit-profile-btn">Edit Profile</button>
        </div>
      </div>

      {/* Profile Bio */}
      <div>
        <p className="bio">
          <strong>{userData?.name}</strong> Software Engineer | Coffee Lover |
          Traveler
        </p>
      </div>

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
    </div>
  );
}
