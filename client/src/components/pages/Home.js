import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';

const Home = () => {
    const authContext = useContext(AuthContext);
    useEffect(()=>{
        authContext.loadUser(1);
        // eslint-disable-next-line
    }, [])
    return (
        <div>
            <h1>Home</h1>
        </div>
    )
};

export default Home
