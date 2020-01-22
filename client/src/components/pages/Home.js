import React, { useEffect, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import jwt from 'jsonwebtoken';

const Home = () => {

    const authContext = useContext(AuthContext);
    const { loadUser } = authContext;
    useEffect(()=>{
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
        //eslint-disable-next-line
    }, []);

    return (
        <div>
            <h1>Home</h1>
        </div>
    )
};

export default Home
