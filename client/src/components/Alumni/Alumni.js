import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import AlumnusItem from './AlumnusItem';
import AlumniContext from '../../context/alumni/alumniContext';
import AlumniFilter from '../../context/alumni/AlumniFilter';

const Alumni = (props) => {

    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const alumniContext = useContext(AlumniContext);
    
    const { alumni, getAlumni, filteredAlumni } = alumniContext;

    useEffect(() => {
       authContext.loadUser(1);
        try{
            getAlumni(user._id);
        }
        catch(err){
           console.log(err.message);
        }
        // eslint-disable-next-line
    }, [user]);

    if(alumni.length === 0){
        return <h4>Please add a contact!</h4>
    }

    return (
        <Fragment>
            <AlumniFilter />
            <TransitionGroup>
            {(filteredAlumni || alumni).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <AlumnusItem alumnus={alumnus} {...props} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Alumni;