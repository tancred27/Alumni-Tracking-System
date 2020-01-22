import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import AuthContext from '../../context/auth/authContext';
import UserItem from './UserItem';
import AlumniContext from '../../context/alumni/alumniContext'

const Users = () => {

    const authContext = useContext(AuthContext);

    const { user } = authContext;
    const alumniContext = useContext(AlumniContext);
    
    const { users, getUsers } = alumniContext;

    useEffect(() => {
        authContext.loadUser(1);
        try{
            getUsers(user._id);
        }
        catch(err){
           console.log(err.message);
        }
        // eslint-disable-next-line
    }, [user]);

    if(users.length === 0){
        return <h4>Please add a contact!</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
            {(users).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <UserItem alumnus={alumnus} />
                </CSSTransition>
            ))}
            </TransitionGroup>
        </Fragment>
    );
};

export default Users;