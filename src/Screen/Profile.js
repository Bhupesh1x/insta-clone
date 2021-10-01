import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Component/Navbar";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import axios from "axios";
import { DataContext } from "../DataContext";

function Profile() {
  const access_token = JSON.parse(window.localStorage.getItem("jwt"));
  const [myPosts, setMyPosts] = useState([]);
  const [user, setUser] = useContext(DataContext);

  const authAxios = axios.create({
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await authAxios.get(
          "https://myinstaclonebackend.herokuapp.com/mypost"
        );
        setMyPosts(result.data.myposts);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <Navbar />
      <div className="profile">
        <div className="profile__body">
          <div className="profile__top">
            <div className="profile__left">
              <Avatar src={user?.url} className="profile__avatar" />
            </div>
            <div className="profile__right">
              <h1 className="profile__heading">{user.name}</h1>
              <div className="flex items-center">
                <h1 className="profile__data ml-1">{myPosts.length} Posts</h1>
                <h1 className="profile__data">
                  {user?.followers?.length ? user?.followers?.length : 0}{" "}
                  Followers
                </h1>
                <h1 className="profile__data">
                  {user?.following?.length ? user?.following?.length : 0}{" "}
                  Following
                </h1>
              </div>
            </div>
          </div>
          <div className="profile__bottom">
            <h1 className="profileBottom__heading  mt-4">My Posts</h1>
            <div className="profile__bottomData">
              {myPosts.map((value) => {
                return (
                  <img
                    className="profileBottom__image"
                    src={value.photo}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
