import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [url, setUrl] = useState(null);
  const history = useHistory();

  const changeImageHandler = (event) => {
    const formData = new FormData();
    formData.append("file", event.target.files[0]);
    formData.append("upload_preset", "insta-clone");
    formData.append("cloud_name", "atm1x");

    fetch("https://api.cloudinary.com/v1_1/atm1x/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        setUrl(result.url);
        console.log(result);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // {
  //   url
  //     ? setApiData(name, email, password)
  //     : setApiData(name, email, password, url);
  // }

  var apiData;

  {
    url === null
      ? (apiData = {
          name,
          email,
          password,
        })
      : (apiData = {
          name,
          email,
          password,
          url,
        });
  }

  async function signup(e) {
    e.preventDefault();
    console.log(apiData);
    if (email === "" || password === "" || name === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      var result = await fetch("/signup", {
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
        toast.success("Signup Successfull");
        history.push("/");
      }
    }
  }

  return (
    <div>
      <Navbar />
      <div className="signup">
        <div className="signup__card">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png"
            alt="logo"
            className="signup__logo"
          />
          <p className="signup__data">
            Sign up to see photos and videos
            <br /> from your friends.
          </p>
          <input
            type="text"
            className="auth-destination-input w-full input__margins "
            placeholder="Enter Your Full Name Here"
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            className="auth-destination-input w-full  "
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
          <input
            type="file"
            className="auth-destination-input w-full"
            placeholder="Upload Image"
            onChange={(e) => changeImageHandler(e)}
            required
          />
          <button className="signup__button" onClick={signup}>
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
