import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlumniContext from '../../context/alumni/alumniContext';
import { Redirect, Link } from 'react-router-dom';

const CollegeItem = ({ college }) => {
    const alumniContext = useContext(AlumniContext);
    const { setCurrentCollegeId } = alumniContext;
    const { name, _id } = college;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                Name: {name}
            </h3>
            <ul className="list">
                <div>
                <a href="/alumni"><button type="submit" value="View Profile" onClick={() => setCurrentCollegeId(_id)}>View Alumni</button></a>
            </div>
            </ul>
        </div>
    );
};

CollegeItem.propTypes = {
    college: PropTypes.object.isRequired
};

export default CollegeItem;

//<input type="submit" onClick={() => setCurrentCollegeId(_id)} className="btn btn-dark btn-block"><Link to='/alumni'>View Alumni</Link></input>
