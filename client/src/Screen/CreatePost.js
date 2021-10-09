import React, { useState } from "react";
import Navbar from "../Component/Navbar";
import "./Signup.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function CreatePost() {
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const access_token = JSON.parse(window.localStorage.getItem("jwt"));

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

  const history = useHistory();

  const apiData = {
    title: description,
    photo: url,
  };

  async function createpost(e) {
    e.preventDefault();
    if (url === "" || description === "") {
      toast.error("Please Check All The Required Fields");
    } else {
      var result = await fetch(
        "https://myinstaclonebackend.herokuapp.com/createpost",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${access_token}`,
          },
          body: JSON.stringify(apiData),
        }
      );
      result = await result.json();
      console.log(result);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success("Post Added Successfull");
        history.push("/home");
      }
    }
  }

  return (
    <div className="createPost">
      <div>
        <Navbar />
      </div>
      <div className="signup__body">
        <div className="signup__card">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png"
            alt="logo"
            className="signup__logo"
          />
          <p className="signup__data">Create Posts Here</p>
          <input
            type="file"
            className="auth-destination-input w-full margin__positionInput"
            placeholder="Upload Image"
            onChange={(e) => changeImageHandler(e)}
            required
          />
          <input
            type="text"
            className="auth-destination-input w-full  "
            placeholder="Post Description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button className="signup__button" onClick={createpost}>
            Upload Post
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreatePost;
