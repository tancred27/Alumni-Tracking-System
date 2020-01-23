import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlumniContext from '../../context/alumni/alumniContext';
import { Link } from 'react-router-dom';

const AlumnusItem = (props) => {
    const alumniContext = useContext(AlumniContext);
    const { setCurrentAlumnusId } = alumniContext;
    const { _id, name, college, year, branch } = props.alumnus;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                Name: {name}
            </h3>
            <ul className="list">
                College:<li>
                    <i className="fas fa-envelope-open"></i> {college}
                </li>
                Branch:<li>
                    <i className="fas fa-phone"></i> {branch}
                </li>
                Year:<li>
                    <i className="fas fa-phone"></i> {year}
                </li>
                <div>
                <Link to={`/api/users/${_id}`} className='btn btn-dark btn-sm my-1'>View Profile</Link>
            </div>
            </ul>
        </div>
    );
};


AlumnusItem.propTypes = {
    alumnus: PropTypes.object.isRequired
};


export default AlumnusItem;
//<input type="submit" onClick = {onClick} value="Profile" className="btn btn-dark btn-block"/>