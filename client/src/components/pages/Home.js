import React, { Fragment } from "react";
import jwt from "jsonwebtoken";
import EmailForm from "./EmailForm";
import SmsForm from "./SmsForm";
import { Redirect } from "react-router-dom";

const Home = (props) => {
  if (!localStorage.getItem("token")) {
    return <Redirect to="/login" />;
  } else {
    const decoded = jwt.verify(localStorage.token, "secrettoken");

    if (decoded.college || decoded.directorate) {
      return (
        <Fragment>
          <EmailForm />
          <br></br>
          <SmsForm />
        </Fragment>
      );
    } else {
      return (
        <div>
          <Redirect to="/about" />
        </div>
      );
    }
  }
};

export default Home;
