import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const CollegeItem = (props) => {
    const { name, _id } = props.college;
    return (
        <div className="card bg-light">
            <h3>College Name: <span className="text-primary text-left">{name}</span></h3>
            <ul className="list">
            <div>
                <Link to={`/alumni/${_id}`} className='btn btn-dark btn-sm my-1'>View Alumni</Link>
            </div>
            </ul>
        </div>
    );
};

CollegeItem.propTypes = {
    college: PropTypes.object.isRequired
};

export default CollegeItem;

