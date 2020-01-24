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
    color = 'primary';
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
      col: 'primary',
      tex: 'Authenticated',
      dis: true
    })
  }
  
  const onClick=(e)=>{
      console.log(user._id)
      console.log(_id)
    alumniContext.sendRequest({request:user._id,accept:_id})
  }

  const profile=()=>{
    return(
    <div className="">
    <div className="my-3">
  <label>name:</label>
  <h4>{name}</h4>
  </div>
    <div className="my-3">
    <label>email:</label>
  <h4>{email}</h4>
    </div>
    <div className="my-3">
    <label>college:</label>
  <h4>{college}</h4>
    </div>
    <div className="my-3">
    <label>phone:</label>
  <h4>{phone}</h4>
    </div>
    <div className="my-3">
    <label>DOB:</label>
  <h4>{dob}</h4>
    </div>
    <div className="my-3">
    <label>company:</label>
  <h4>{company}</h4>
    </div>
    <div className="my-3">
    <label>info:</label>
  <h4>{info}</h4>
    </div>

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
  console.log(e.target.value)
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
    setBoll(bol)
    console.log("helno");
    
  } 
const renderButton=()=>{
    const {friends,accept,request} =alumniContext.notification;
    console.log(alumniContext.notification);
    console.log(friends)
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
    
    
      <div className="row">
      
      <div className="col-lg-4 col-md-6 col-sm-12">
      
          <div className="profile-userpic my-3">
           <center><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWYWW2DyiDmeF1qF3yvDU771PU0AoHWbBB6Vnz9EW8UJBwfKx8ag&s" style={{minWidth:'150px',maxWidth:'150px'}} className="rounded-circle img-thumbnail" alt=""/></center> 
          </div>
          <div className="text-center">
          <h3>{name}</h3>
          <h3>{branch}</h3>
          </div>
    
       </div>
      <div className="col-lg-2 col-md-6 col-sm-12">
            <div className="row my-4"></div>
            {props.alumni&&props.notf?<div className="my-3">{
                renderButton()}
            </div>:<div></div>}
            {!user.isUser?<div className="my-3">
            <center><Link to="/"><button className="btn btn-danger" >contact</button></Link></center> 
            </div>:<div></div>}
            <div className="my-3">
            <center><button onClick={authBoi} disabled={auth.dis} className={'btn btn-outline-'+auth.col}>{auth.tex}</button></center> 
            </div>
        </div>
        <div className="col-lg-6 md-hide sm-hide bg-primary badge">
        <div >
        <h2 className="text-gray-dark">Currently working at</h2>
        <h3>{company}</h3>
        </div>
        </div>
        <div className="col-lg-12 col-md-12 sm-hide align-items-lg-end">
        <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">

  <ul className="nav nav-pills">
  <li ><button onClick={bool} className={"btn"+(!boll?"":"btn-primary")}>Home</button></li>
  
</ul>
          
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
            {profile()}
      </div>
       </div>
        
      </div>
    
  );
}


export default ProfileItem;
//<nav class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" aria-selected="true" onClick={bool}>Profile</nav>
  //        <nav class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" aria-selected="false" onClick={bool}>Edit</nav>
  //<li>{user.isCollege?<button onClick={bool} className={"btn"+(boll?"":"btn-primary")}>Edit</button>:<div></div>}</li>