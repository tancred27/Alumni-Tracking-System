import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AuthContext from "../../context/auth/authContext";
import AlumnusItem from "./AlumnusItem";
import AlumniContext from "../../context/alumni/alumniContext";
import AlumniFilter from "../../context/alumni/AlumniFilter";
import jwt from "jsonwebtoken";

const Alumni = (props) => {
  const authContext = useContext(AuthContext);

  const { user, loadUser } = authContext;
  const alumniContext = useContext(AlumniContext);

  const { alumni, getAlumni, filteredAlumni } = alumniContext;

  const id = props.match.params.id;

  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt.verify(localStorage.token, "secrettoken");
      if (decoded.user) {
        loadUser(2);
      } else if (decoded.college) {
        loadUser(1);
      } else {
        loadUser(3);
      }
    }
    try {
      getAlumni(id || user._id);
    } catch (err) {
      console.log(err.message);
    }
    // eslint-disable-next-line
  }, []);

  if (alumni.length === 0) {
    return <h4>Loading!</h4>;
  }

  return (
    <Fragment>
      <AlumniFilter />
      <br></br>
      <div style={userStyle}>
        {(filteredAlumni || alumni).map((alumnus) => (
          <AlumnusItem alumnus={alumnus} />
        ))}{" "}
      </div>
    </Fragment>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1.5rem",
};

export default Alumni;
