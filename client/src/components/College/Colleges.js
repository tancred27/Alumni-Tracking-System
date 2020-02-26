import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import CollegeItem from './CollegeItem';
import AlumniContext from '../../context/alumni/alumniContext';
import AuthContext from '../../context/auth/authContext';
import CollegeFilter from '../../context/alumni/CollegeFilter';
import jwt from 'jsonwebtoken';

const Colleges = () => {

    const alumniContext = useContext(AlumniContext);
    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;

    const { filteredColleges, colleges, getColleges } = alumniContext;

    useEffect(() => {
        if(localStorage.token){
            const decoded = jwt.verify(localStorage.token, 'secrettoken');
            if(decoded.user){
                loadUser(2)
            }
            else if(decoded.college){
                loadUser(1)
            }
            else{
                loadUser(3)
            }
        }
        try{
            getColleges();
        }
        catch(err){
           console.log(err.message);
        }
        // eslint-disable-next-line
    }, []);

    if(colleges.length === 0){
        return <h4>Loading!</h4>
    }

    return (
        <Fragment>
            <CollegeFilter />
            <br></br>
            <TransitionGroup>
            {(filteredColleges || colleges).map(college => (
                <CSSTransition key={college._id} classNames="item" timeout={500}>
                    <CollegeItem college={college} />
                </CSSTransition>
            ))} 
            </TransitionGroup>
        </Fragment>
    );
};

export default Colleges;