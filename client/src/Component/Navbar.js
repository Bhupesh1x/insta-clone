import React, { useContext, useHistory } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { DataContext } from "../DataContext";

function Navbar() {
  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  const [user, setUser] = useContext(DataContext);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  return (
    <div className="navbar">
      <div className="navbar__left">
        <Link to="/home">
          <img
            src="https://cdn.icon-icons.com/icons2/2699/PNG/512/instagram_logo_icon_170643.png"
            alt="logo"
            className="navbar__logo"
          />
        </Link>
      </div>
      {user.name ? (
        <>
          <div className="navbar__right">
            <Link to="/createpost">
              <p className="navbar__rightData ">Create Post</p>
            </Link>
            <Link to="/followingpost">
              <p className="navbar__rightData ">My Following Posts</p>
            </Link>
            <Link to="/profile">
              <p className="navbar__rightData ">Profile</p>
            </Link>

            <button className="logout--button" onClick={logout}>
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="navbar__rightSign">
            <Link to="/signup">
              <p className="navbar__rightData ">Signup</p>
            </Link>
            <Link to="/">
              <p className="navbar__rightData ">SignIn</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Navbar;
