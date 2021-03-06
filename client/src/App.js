import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alerts from "./components/layout/Alerts";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";
import PrivateRoute from "./components/routing/PrivateRoute";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Alumni from "./components/Alumni/Alumni";
import Users from "./components/Users/Users";
import Colleges from "./components/College/Colleges";
import AlumniState from "./context/alumni/AlumniState";
import Profile from "./components/pages/Profile";
import Update from "./components/auth/Update";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <AlumniState>
        <AlertState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/update" component={Update} />
                  <PrivateRoute exact path="/alumni" component={Alumni} />
                  <PrivateRoute exact path="/alumni/:id" component={Alumni} />
                  <PrivateRoute exact path="/users" component={Users} />
                  <PrivateRoute exact path="/colleges" component={Colleges} />
                  <PrivateRoute path="/profile/:id" component={Profile} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertState>
      </AlumniState>
    </AuthState>
  );
};

export default App;
