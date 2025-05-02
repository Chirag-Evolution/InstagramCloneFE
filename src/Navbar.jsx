import React, { useState, createContext } from "react";
import instagram from "./assets/instagram.png";
import "./Navbar.css";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { loginContext } from "./context/loginContext";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
export default function Navbar({ login }) {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleLogout = () => {
    console.log("logout");
    localStorage.clear();
    setShow(false);
    navigate("/signin");
  };

  const loggedIn = localStorage.getItem("logged");
  console.log(loggedIn);
  const loginStatus = () => {
    if (login || loggedIn) {
      return [
        <>
          <li>
            <Link
              to="/home"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/createpost"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Create Post
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Profile
            </Link>
          </li>
          <li>
            <button className="btn btn-danger" onClick={handleShow}>
              Log out
            </button>
          </li>
        </>,
      ];
    } else {
      return [
        <>
          <li>
            {" "}
            <Link
              to="/signup"
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: "/signin",
              }}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              Sign In
            </Link>
          </li>
        </>,
      ];
    }
  };
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <div
          className="container-fluid d-flex"
          style={{ justifyContent: "space-around" }}
        >
          <a className="navbar-brand" href="#">
            <img
              src={instagram}
              alt=""
              width="30"
              height="24"
              className="d-inline-block align-text-top"
            />
          </a>
          <ol>{loginStatus()}</ol>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to logout ?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogout}>
            Log out
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
