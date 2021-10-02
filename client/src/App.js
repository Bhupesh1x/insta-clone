import React, { useContext, useEffect } from "react";
import Routes from "./Routes";
import { DataProvider } from "./DataContext";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
} from "react-router-dom";
import { DataContext } from "./DataContext";
import Signin from "./Screen/Signin";
import Signup from "./Screen/Signup";

const Routing = () => {
  const [user, setUser] = useContext(DataContext);
  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  const history = useHistory();
  useEffect(() => {
    setUser(userLocal);
  }, []);
  console.log(user);
  return <Routes />;
};

function App() {
  const userLocal = JSON.parse(window.localStorage.getItem("user"));
  return (
    <div>
      <DataProvider>
        <Router>
          {window.localStorage.getItem("user") ? (
            <Routing />
          ) : (
            <>
              <Route exact path="/" component={Signin}></Route>
              <Route exact path="/signup" component={Signup}></Route>
            </>
          )}
        </Router>
      </DataProvider>
    </div>
  );
}

export default App;
