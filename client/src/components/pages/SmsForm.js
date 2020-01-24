import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlumniContext from '../../context/alumni/alumniContext';
import jwt from 'jsonwebtoken';

const SmsForm = () => {

    const authContext = useContext(AuthContext);

    const alumniContext = useContext(AlumniContext);

    const { sendSms,user } = alumniContext;

    const { loadUser } = authContext;

    let autoSMS="";
     if(user){
    autoSMS=user.phone}


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
        // eslint-disable-next-line
    }, []);

    const [sms, setSms] = useState({
        to: autoSMS,
        text: ''
    });

    const { to, text } = sms;

    const onChange = e => setSms({ ...sms, [e.target.name]: e.target.value })


    const onSubmit = e => {
        try{
            sendSms({
                to,
                text
            })
            alert("SMS Sent!");
            setSms({...sms, to: '', text: ''});
        }
        catch(err){
            console.log(err.message)
        }
    };

    return (
        <div className="card">
            <h1>
                Send <span className="text-primary">SMS</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Mobile number of recipient</label>
                    <input type="text" value = {to} name="to" onChange={onChange}/>
                </div>
                <div className="form-group">
                    Message
                    <textarea value={text} name="text" onChange={onChange} rows="5" cols="50">
                    </textarea>
                </div>
                <input type="submit" value="Send!" className="btn btn-dark btn-block"/>
            </form>
        </div>
    )
}

export default SmsForm
