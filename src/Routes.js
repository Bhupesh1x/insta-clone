import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Screen/Home";
import CreatePost from "./Screen/CreatePost";
import FollowingPost from "./Screen/FollowingPost";
import Profile from "./Screen/Profile";
import UserProfile from "./Screen/UserProfile";
import Signin from "./Screen/Signin";
import Signup from "./Screen/Signup";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Signin}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/followingpost" component={FollowingPost}></Route>
        <Route exact path="/createpost" component={CreatePost}></Route>
        <Route exact path="/profile" component={Profile}></Route>
        <Route path="/profile/:userid" component={UserProfile}></Route>
        <Route exact path="/" component={Signin}></Route>
        <Route exact path="/signup" component={Signup}></Route>
      </Switch>
    </Router>
  );
}

export default Routes;
