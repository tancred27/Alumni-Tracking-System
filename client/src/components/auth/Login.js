import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';


const Login = (props) => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;
    
    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'Invalid Credentials!'){
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
        type: 'Alumnus'
    });
 
    const { email, password, type } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        let id;
        if(type === 'Directorate'){
            id = '3';
        }
        else if(type === 'Alumnus'){
            id = '2';
        }
        else if(type === 'College'){
            id = '1';
        }
        else{console.log('something is wrong')}

        e.preventDefault();
        login(id, {
            email,
            password
        });
    };

    return (
        <div className="card">
            <h1>
                Account <span className="text-primary">Login</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" value={email} name="email" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} name="password" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <h4>Logging in as: </h4><br></br>
                    <input type="radio" name="type" onChange={onChange} value="College" checked={type==='College'} />College{'  '}
                    <input type="radio" name="type" onChange={onChange} value="Directorate" checked={type==='Directorate'} />Directorate{' '}
                    <input type="radio" name="type" onChange={onChange} value="Alumnus" checked={type==='Alumnus'} />Alumnus
                </div>
                <input type="submit" value="Login" className="btn btn-dark btn-block"/>
            </form>
        </div>
    )
}

export default Login
