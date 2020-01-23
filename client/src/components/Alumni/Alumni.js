import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import AlumnusItem from './AlumnusItem';
import AlumniContext from '../../context/alumni/alumniContext';
import AlumniFilter from '../../context/alumni/AlumniFilter';
import jwt from 'jsonwebtoken';

const Alumni = (props) => {

    const authContext = useContext(AuthContext);

    const { user, loadUser } = authContext;
    const alumniContext = useContext(AlumniContext);
    
    const { alumni, getAlumni, filteredAlumni, currentCollegeId } = alumniContext;

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
            getAlumni(props.id || user._id);
        }
        catch(err){
           console.log(err.message);
        }
        // eslint-disable-next-line
    }, []);

    if(alumni.length === 0){
        return <h4>Loading!</h4>
    }


    return (
        <Fragment>
            <AlumniFilter />
            <TransitionGroup>
            {(filteredAlumni || alumni).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <AlumnusItem alumnus={alumnus}  />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Alumni;