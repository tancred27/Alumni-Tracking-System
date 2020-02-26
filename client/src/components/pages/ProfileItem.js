import React,{ useContext, useEffect, useState } from 'react';
import AlumniContext from '../../context/alumni/alumniContext';
import AuthContext from '../../context/auth/authContext';
import jwt from 'jsonwebtoken';
import {Link} from 'react-router-dom';
let obj;

const ProfileItem=(props)=> {

  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const alumniContext = useContext(AlumniContext);
  const { authenticateUser } = alumniContext;
  const { name,branch,info,company, _id ,dob,email,phone,college}= props.user
  obj=props.user;
  var bol=true;
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

  let color = 'dark';
  let text = 'Authenticate';
  let disabled = false;

  if(props.user.authenticated || user.isUser || user.isDirectorate){
    color = 'success';
    text = 'Authenticated'; 
    disabled = true
  }

  const [auth, setAuth] = useState({
    col: color,
    tex: text,
    dis: disabled
  })
  const [boll, setBoll] = useState(true)
  

  const authBoi=()=>{
    authenticateUser(props.user)
    setAuth({
      col: 'success',
      tex: 'Authenticated',
      dis: true
    })
  }
  
  const onClick=(e)=>{
    alumniContext.sendRequest({request:user._id,accept:_id})
  }

  const profile=()=>{
    return(
      <div className = "sup">
        <h2>Name : {name}</h2><br></br>
        <h2>Email: {email}</h2><br></br>
        <h2>College : {college}</h2><br></br>
        <h2>Phone : {phone}</h2><br></br>
        <h2>DOB : {dob}</h2><br></br>
        <h2>Company : {company}</h2><br></br>
        <h2>Information : {info}</h2>
      </div>
    )
  }

  const [ooser, setOoser] = useState({
    email: '',
    info: '',
    company: '',
    phone: alumniContext.user.phone,
    authenticated: false
  });


const onChange = e => {
  setOoser({ ...ooser, [e.target.name]: e.target.value })}
  const onSubmit = (e) => {
    e.preventDefault();
    authenticateUser(alumniContext.user, ooser);

  }
  const edit=()=>{
    return (<div>
      <form className="form-container" onSubmit={onSubmit}>
    <div className="form-group">
        <label htmlFor="info">Info</label>
        <input id="1" type="text" placeholder={alumniContext.user.info}  name="name" onChange={onChange} />
    </div>
    <div className="form-group">
        <label htmlFor="company">Company</label>
        <input id="2" name="company" placeholder={alumniContext.user.company} onChange={onChange} type="text" />
    </div>
    <div className="form-group">
        <label htmlFor="authenticated">Authenticate</label>
        <input id="3" name="authenticated"  onChange={onChange} type="checkbox" />
    </div>
    <input type="submit" value="Update" className="btn btn-dark btn-block"/>
    </form>
    </div>)
  }
  
  const bool=()=>{
    bol=!bol
    setBoll(bol);
  } 
const renderButton=()=>{
    const {friends,accept,request} =alumniContext.notification;
      if(friends.indexOf(_id)!=-1){
        return <center><button className="btn btn-outline-success disabled">Friends</button></center> 
      }
      else if(request.indexOf(_id)!=-1){
        return <center><button className="btn btn-outline-primary"  onClick={onClick}>Requested</button></center> 
      }
      else if(accept.indexOf(_id)!=-1){
        return <center><button className="btn btn-outline-info" onClick={onClick}>Accept</button></center> 
      }
      else{
      return <center><button className="btn btn-outline-success" onClick={onClick}>Add Friend</button></center>
      }
 }

  return (
      <div className="card grid-2">
        <div className="all-center">
          <img src= "https://i.4pcdn.org/tv/1485796767156.jpg"  className='round-img' alt='' style={{width: '150px'}} />
          <h1>{name}</h1>
          {props.alumni&&props.notf?<div>{
            renderButton()}
          </div>:<div></div>}
            {!user.isUser?<div>
            <center><Link to="/"><button className="btn btn-danger">contact</button></Link></center> 
            </div>:<div></div>}<br></br>
            <div>
              <center><button onClick={authBoi} disabled={auth.dis} className={'btn btn-'+auth.col}>{auth.tex}</button></center> 
            </div>
       </div>
       <div className="my-3">
       <div className='badge badge-light'>{profile()}</div>
       </div>
      </div> 
  
        
      
    
  );
}


export default ProfileItem;
//<nav class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" aria-selected="true" onClick={bool}>Profile</nav>
  //        <nav class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" aria-selected="false" onClick={bool}>Edit</nav>
  //<li>{user.isCollege?<button onClick={bool} className={"btn"+(boll?"":"btn-primary")}>Edit</button>:<div></div>}</li>

  //<div className="my-3">
//  <div className='badge badge-primary'>{profile()}</div>