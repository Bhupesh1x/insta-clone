import React, { useEffect, useState, useContext } from "react";
import Navbar from "../Component/Navbar";
import "./Profile.css";
import { Avatar } from "@material-ui/core";
import { DataContext } from "../DataContext";
import { useParams } from "react-router-dom";

function Profile() {
  const access_token = JSON.parse(window.localStorage.getItem("jwt"));
  const [userProfile, setProfile] = useState(null);
  const [user, setUser] = useContext(DataContext);
  const { userid } = useParams();
  const [showfollow, setShowFollow] = useState(
    user ? !user?.following?.includes(userid) : true
  );

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = () => {
    fetch(`/user/${userid}`, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setProfile(result);
      });
  };

  const followUser = () => {
    fetch("/follow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        followId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        getProfile();
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    fetch("/unfollow", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        unfollowId: userid,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);
        getProfile();
        setShowFollow(true);
      });
  };

  console.log("user is", userProfile);
  return (
    <div>
      <Navbar />
      <>
        {userProfile ? (
          <>
            <div className="profile">
              <div className="profile__body">
                <div className="profile__top">
                  <div className="profile__left">
                    <Avatar
                      src={userProfile?.user?.url}
                      className="profile__avatar"
                    />
                  </div>
                  <div className="profile__right">
                    <div className="flex items-center justify-between">
                      <h1 className="profile__heading">
                        {userProfile.user.name}
                      </h1>
                      {showfollow ? (
                        <button
                          className="follow__button mr-4"
                          onClick={() => followUser()}
                        >
                          Follow
                        </button>
                      ) : (
                        <button
                          className="follow__button mr-4"
                          onClick={() => unfollowUser()}
                        >
                          Unfollow
                        </button>
                      )}
                    </div>
                    <div className="flex items-center">
                      <h1 className="profile__data ml-1">
                        {userProfile.posts.length} Posts
                      </h1>
                      <h1 className="profile__data">
                        {userProfile.user.followers.length} Followers
                      </h1>
                      <h1 className="profile__data">
                        {userProfile.user.following.length} Following
                      </h1>
                      <br />
                    </div>
                  </div>
                </div>

                <div className="profile__bottom">
                  <h1 className="profileBottom__heading  mt-4">My Posts</h1>
                  <div className="profile__bottomData">
                    {userProfile.posts.map((item) => {
                      return (
                        <img
                          key={item._id}
                          className="profileBottom__image"
                          src={item.photo}
                          alt={item.title}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <h2 className="text-4xl text-bold text-center mt-16">Loading ...</h2>
        )}
      </>
    </div>
  );
}

export default Profile;
