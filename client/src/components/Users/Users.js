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
    }, []);

    if(users.length === 0){
        return <h4>Loading!</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                <div style={userStyle}>
            {(users).map(alumnus => (
                <CSSTransition key={alumnus._id} classNames="item" timeout={500}>
                    <UserItem alumnus={alumnus} />
                </CSSTransition>
            ))} </div>
            </TransitionGroup>
        </Fragment>
    );
};

const userStyle = {
    display : 'grid',
    gridTemplateColumns : 'repeat(3, 1fr)',
    gridGap : '1.5rem'
};

export default Users;