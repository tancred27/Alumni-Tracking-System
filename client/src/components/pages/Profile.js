import React, { Fragment, useContext, useEffect } from "react";
import ProfileItem from "./ProfileItem";
import AlumniContext from "../../context/alumni/alumniContext";
import AuthContext from "../../context/auth/authContext";
import jwt from "jsonwebtoken";

const Profile = (props) => {
  const alumniContext = useContext(AlumniContext);
  const authContext = useContext(AuthContext);
  let alumni = false;
  useEffect(() => {
    alumniContext.getProfile(props.match.params.id);
  }, []);

  if (localStorage.getItem("token")) {
    const decoded = jwt.verify(localStorage.token, "secrettoken");
    if (authContext.user.isUser) {
      alumni = true;
      alumniContext.getNotifications(decoded.user.id);
    } else {
      alumni = false;
    }
  } else {
    console.log("not authorized");
  }

  return (
    <Fragment>
      {alumniContext.user && (alumni != true || alumniContext.notification) ? (
        <ProfileItem
          user={alumniContext.user}
          notf={alumniContext.notification}
          alumni={alumni}
        />
      ) : (
        <h2>loading</h2>
      )}
    </Fragment>
  );
};

export default Profile;
