import React from 'react';
import PropTypes from 'prop-types';
//import AlumniContext from '../../context/alumni/AlumniContext';

const UserItem = ({ alumnus }) => {
    //const alumniContext = useContext(AlumniContext);
    const { name, college, year, branch } = alumnus;

    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                Name: {name}
            </h3>
            <ul className="list">
                College: {college && (<li>
                    <i className="fas fa-envelope-open"></i> {college}
                </li>)}
                Branch: {branch && (<li>
                    <i className="fas fa-phone"></i> {branch}
                </li>)}
                Year: {year && (<li>
                    <i className="fas fa-phone"></i> {year}
                </li>)}
            </ul>
        </div>
    );
};


UserItem.propTypes = {
    alumnus: PropTypes.object.isRequired
};


export default UserItem;