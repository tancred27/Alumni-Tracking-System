import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AlumniContext from '../../context/alumni/alumniContext';
import { Link } from 'react-router-dom';

const CollegeItem = (props) => {
    //const alumniContext = useContext(AlumniContext);
    //const { setCurrentCollegeId } = alumniContext;
    const { name, _id } = props.college;


    return (
        <div className="card bg-light">
            <h3 className="text-primary text-left">
                Name: {name}
            </h3>
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

//<input type="submit" onClick={() => setCurrentCollegeId(_id)} className="btn btn-dark btn-block"><Link to='/alumni'>View Alumni</Link></input>
