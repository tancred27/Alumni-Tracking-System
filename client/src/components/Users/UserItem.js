import React from 'react';
import PropTypes from 'prop-types';
import  { Link } from 'react-router-dom';

const UserItem = ({ alumnus }) => {
    const { _id, name, college, branch, phone } = alumnus;

    return (
        <div className="card text-left">
            <ul className="list">
                <li><h4>Name: <span className="text text-primary">{name}</span></h4></li>
                <li><i className="fas fa-graduation-cap"></i><strong>College: </strong>{college}</li>
                <li><i className="fas fa-code-branch"></i><strong>Branch: </strong>{branch}</li>
                <li><i className="fas fa-phone"></i><strong>Contact: </strong>{phone}</li>
            <div>
            <Link to={`/profile/${_id}`}><button type="button" className="btn btn-dark" value="View Profile">View Profile</button></Link>
            </div>
            </ul>
        </div>
    );
};


UserItem.propTypes = {
    alumnus: PropTypes.object.isRequired
};


export default UserItem;