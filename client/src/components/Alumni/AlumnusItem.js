import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlumniContext from '../../context/alumni/alumniContext';
import { Route, Redirect,Link } from 'react-router-dom';

const AlumnusItem =(props) => {
    const alumniContext = useContext(AlumniContext);
    const { setCurrentAlumnusId } = alumniContext;
    const { _id, name, college, year, branch } =props.alumnus;
    
   const onClick=(e)=>{
    setCurrentAlumnusId(_id);
    console.log('onClick')
    console.log(props)
    //props.history.push('/profile')
   }

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
            <Link to={`/profile/${_id}`}><button type="button" value="View Profile" onClick={onClick}>View Profile</button></Link>
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