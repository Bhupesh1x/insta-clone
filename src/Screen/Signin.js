import React, { useContext, useState } from "react";
import Navbar from "../Component/Navbar";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DataContext } from "../DataContext";

toast.configure();

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useContext(DataContext);
  const history = useHistory();

  const apiData = {
    email,
    password,
  };

  async function signin(e) {
    e.preventDefault();
    if (email === "" || password === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      var result = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(apiData),
      });
      result = await result.json();
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("SignIn Successfull");
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("jwt", JSON.stringify(result.token));
        setUser(result.user);
        window.location.href = "/home";
      }
    }
  }

  {
    window.localStorage.getItem("user") && history.push("/home");
  }

  return (
    <div>
      <Navbar />
      <div className="signup">
        <div className="signup__card">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png"
            alt="logo"
            className="signin__logo"
          />
          <p className="signup__data">
            Sign in to see photos and videos
            <br /> from your friends.
          </p>
          <input
            type="text"
            className="auth-destination-input w-full  margin__positionInput"
            placeholder="Enter Your Email Here"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className="auth-destination-input w-full  "
            placeholder="Enter Your password Here"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="signin__button" onClick={signin}>
            Signin
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signin;
