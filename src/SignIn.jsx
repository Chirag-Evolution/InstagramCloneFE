import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import instagram from "./assets/instagram.png";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { loginContext } from "./context/loginContext";
export default function SignIn() {
  const { setUserLogin } = useContext(loginContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { email, password };
    axios
      .post("http://localhost:3000/register/signin", payload)
      .then((res) => {
        console.log(res);
        if (res.data.result) {
          toast("Sign in Successfully");
          setUserLogin(true);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("logged", res.data.result);
          localStorage.setItem("user", JSON.stringify(res.data.user));
          navigate("/home");
          setEmail(""), setPassword("");
        } else {
          toast(res.data.msg);
          setEmail(""), setPassword("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="container d-flex justify-content-center align-items-center mt-5">
      <div
        className="main mt-4"
        style={{
          boxShadow: "1px 1px 3px grey",
          margin: "20px",
          padding: "50px",
        }}
      >
        <h2>
          <img src={instagram}></img>
        </h2>
        <div className="header">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email"
              required
            />
            <input
              className="form-control"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password"
              required
            />

            <button className="btn btn-primary mb-3" type="submit">
              Sign in
            </button>
            <p>
              Don't have account ?{" "}
              <Link to="/signup" style={{ textDecoration: "none" }}>
                Create Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
