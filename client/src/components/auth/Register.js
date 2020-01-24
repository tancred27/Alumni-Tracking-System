import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';

const Register = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;
    
    useEffect(() => {
        if(isAuthenticated){
            props.history.push('/');
        }

        if(error === 'A user already exists with the specified email ID!'){
            setAlert(error, 'danger');
            clearErrors();
        }
        // eslint-disable-next-line
    }, [error, isAuthenticated, props.history]);

    const [ user, setUser] = useState({
        name: '',
        email: '',
        dob: '',
        phone: '',
        college: '',
        branch: '',
        company: 'studying',
        year: '',
        info: '',
        password: '',
        password2: ''
    });
 
    const { name, email, dob, phone, college, branch, company, year, info, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const onSubmit = e => {
        e.preventDefault();
        if (password !== password2){
            setAlert('Password and confirm password must match!', 'danger');
        }
        else{
            register({
                name, 
                email,
                dob, 
                phone,
                college,
                company,
                branch,
                year,
                info,
                password
            });
        }
    }

    return (
        <div className="card">
            <h1>
                Account <span className="text-primary">Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" value={name} name="name" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" value={email} name="email" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth</label>
                    <input name="dob" value={dob} type="date" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Mobile Number</label>
                    <input name="phone" value={phone} onChange={onChange} type="text" required />
                </div>
                <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input name="company" value={company} onChange={onChange} type="text" />
                </div>
                <div className="form-group">
                <label htmlFor="year">College</label>
                <select name= "college" value={college} onChange={onChange} required>
                    <option>--Select--</option>
                    <option name="cvr">CVR</option> 
                    <option name="cvsr">CVSR</option>
                    <option name="mvsr">MVSR</option>
                </select>
                </div>
                <div className="form-group">
                    <label htmlFor="branch">Branch</label>
                    <select name="branch" value={branch} onChange={onChange} required>
                        <option>--Select--</option>
                        <option name="cse">Cse</option> 
                        <option name="mech">Mech</option>
                        <option name="ece">Ece</option>
                        <option name="civil">Civil</option>
                        <option name="it">IT</option> 
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="year">Passed out in year</label>
                    <select name="year" value={year} onChange={onChange} required>
                        <option>--Select--</option>
                        <option name="2019">2019</option> 
                        <option name="2018">2018</option>
                        <option name="2017">2017</option>
                        <option name="2016">2016</option>
                        <option name="2015">2015</option> 
                    </select>
                </div>
                <div className="form-group">
                    Information
                    <textarea value={info} onChange={onChange} rows="6" cols="50" name="info">
                    </textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" value={password} name="password" onChange={onChange} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Confirm Password</label>
                    <input type="password" value={password2} name="password2" onChange={onChange} required />
                </div>
                <input type="submit" value="Register" className="btn btn-dark btn-block"/>
            </form>
        </div>
    )
}

export default Register
