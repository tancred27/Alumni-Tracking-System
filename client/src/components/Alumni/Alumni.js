import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import AlumnusItem from './AlumnusItem';
import AlumniContext from '../../context/alumni/alumniContext'

const Alumni = () => {

    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const alumniContext = useContext(AlumniContext);
    
    const { getAlumni } = alumniContext;
    
    useEffect(() => {
        try{
            getAlumni(user._id);
        }
        catch{
            
        }
        // eslint-disable-next-line
    }, []);

    const { alumni, filteredAlumni } = alumniContext;

    console.log(alumni)
    if(alumni.length === 0){
        return <h4>Please add a contact!</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {(filteredAlumni || alumni).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <AlumnusItem alumnus={alumnus} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Alumni;