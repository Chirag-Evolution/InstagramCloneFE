import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./Navbar";
import SignIn from "./SignIn";
import Signup from "./Signup";
import { ToastContainer } from "react-toastify";
import Home from "./home";
import Profile from "./Profile";
import CreatePost from "./CreatePost";
import { loginContext } from "./context/loginContext";
import { useState } from "react";
import UserProfile from "./userprofile";
function App() {
  const [userLogin, setUserLogin] = useState(false);

  return (
    <>
      <loginContext.Provider value={{ setUserLogin }}>
        <Navbar login={userLogin}></Navbar>

        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route exact path="/profile" element={<Profile />}></Route>
          <Route path="/createpost" element={<CreatePost />}></Route>
          <Route path="/profile/:id" element={<UserProfile />}></Route>
        </Routes>

        <ToastContainer></ToastContainer>
      </loginContext.Provider>
    </>
  );
}

export default App;
