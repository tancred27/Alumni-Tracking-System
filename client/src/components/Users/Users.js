import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AuthContext from "../../context/auth/authContext";
import UserItem from "./UserItem";
import AlumniContext from "../../context/alumni/alumniContext";
import jwt from "jsonwebtoken";

const Users = () => {
  let tokenid;
  const authContext = useContext(AuthContext);

  const { user } = authContext;
  const alumniContext = useContext(AlumniContext);

  const { users, getUsers, getAuthUsers } = alumniContext;

  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt.verify(localStorage.token, "secrettoken");
      if (decoded.user) {
        tokenid = 2;
        authContext.loadUser(2);
      } else if (decoded.college) {
        tokenid = 1;
        authContext.loadUser(1);
      } else {
        tokenid = 3;
        authContext.loadUser(3);
      }
    }

    try {
      if (tokenid == 1) getUsers(user._id);
      else if (tokenid == 2 || tokenid == 3) {
        getAuthUsers();
        console.log("sucess");
      }
    } catch (err) {
      console.log(err.message);
    }
    // eslint-disable-next-line
  }, []);

  if (users.length === 0) {
    return <h4>Loading!</h4>;
  }

  return (
    <Fragment>
      <TransitionGroup>
        <div style={userStyle}>
          {users.map((alumnus) => (
            <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
              <UserItem alumnus={alumnus} />
            </CSSTransition>
          ))}{" "}
        </div>
      </TransitionGroup>
    </Fragment>
  );
};

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1.5rem",
};

export default Users;
