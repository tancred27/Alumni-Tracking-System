import React from 'react';
import PropTypes from 'prop-types';
//import AlumniContext from '../../context/alumni/alumniContext';
//import { Route, Redirect } from 'react-router-dom';

const CollegeItem = ({ college }) => {
    const { name } = college;

    const onClick = () => {
        alert('Getting Alumni');
    }
    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                Name: {name}
            </h3>
            <ul className="list">
                <div>
                <input type="submit" onClick = {onClick} value="View Alumni" className="btn btn-dark btn-block"/>
            </div>
            </ul>
        </div>
    );
};

CollegeItem.propTypes = {
    college: PropTypes.object.isRequired
};

export default CollegeItem;