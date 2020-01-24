import React, { useState, useContext, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlumniContext from '../../context/alumni/alumniContext';
import jwt from 'jsonwebtoken';

const EmailForm = () => {

    const authContext = useContext(AuthContext);

    const alumniContext = useContext(AlumniContext);

    const { sendEmail } = alumniContext;

    const { loadUser } = authContext;


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

    const [mail, setMail] = useState({
        email: '',
        subject: '',
        text: ''
    });

    const { email, subject, text } = mail;

    const onChange = e => setMail({ ...mail, [e.target.name]: e.target.value })


    const onSubmit = e => {
        try{
            sendEmail({
                email,
                subject,
                text
            })
            alert("Email Sent!");
            setMail({...mail, email: '', subject: '', text: ''});
        }
        catch(err){
            console.log(err.message)
        }
    };

    return (
        <div className="card">
            <h1>
                Send <span className="text-primary">Email</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email Address of recepient(s)</label>
                    <input type="text" value = {email} name="email" placeholder="Enter emails separated by a comma" onChange={onChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input type="text" value={subject} name="subject" onChange={onChange} />
                </div>
                <div className="form-group">
                    Message
                    <textarea value={text} name="text" onChange={onChange} rows="10" cols="50">
                    </textarea>
                </div>
                <input type="submit" value="Send!" className="btn btn-dark btn-block"/>
            </form>
        </div>
    )
};

export default EmailForm
