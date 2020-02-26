import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import AlumniContext from '../../context/alumni/alumniContext';


const Update = (props) => {

    
    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);
    const alumniContext = useContext(AlumniContext);

    const { setAlert } = alertContext;
    const { error, clearErrors, isAuthenticated } = authContext;
    /* useEffect(()=>{
     loadUser(1);
    },[]) */
    useEffect(() => {

        if(error === 'Invalid Credentials!'){
            setAlert(error, 'danger');
            clearErrors();
        }

        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: '',
        info: '',
        company: ''
    });
 
    const { email, password, info, company } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        alumniContext.updateProfile({
            email,
            password,
            info,
            company
        });
        
        props.history.push('/');
    };

    return (
        <div className="card">
            <h1>
                Account <span className="text-primary">Update</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" value={email} name="email" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} name="password" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input type="text" value={company} name="company" onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="info">Info</label>
                    <input type="text" value={info} name="info" onChange={onChange} />
                </div>
               
                <input type="submit" value="Update" className="btn btn-dark btn-block"/>
            </form>
        </div>
    )
}

export default Update;
