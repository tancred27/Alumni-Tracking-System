import React,{ useContext, useEffect, useState} from 'react';
import AlumniContext from '../../context/alumni/alumniContext';
import AuthContext from '../../context/auth/authContext';
import jwt from 'jsonwebtoken';


const Profile=(props)=> {

  const onChange=(props)=>{}
  const authContext = useContext(AuthContext);
  const { loadUser, user } = authContext;
  const alumniContext = useContext(AlumniContext);
  const { authenticateUser } = alumniContext;
  const {name,branch,info, _id}=props.user

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

  if(props.user.authenticated){
    color = 'primary';
    text = 'Authenticated'; 
    disabled = true
  }

  const [auth, setAuth] = useState({
    col: color,
    tex: text,
    dis: disabled
  })
  
  if(user.isUser || user.isDirectorate){
    setAuth({
      dis: true
    })
  }
  

  const authBoi=()=>{
    authenticateUser(props.user)
    setAuth({
      col: 'primary',
      tex: 'Authenticated',
      dis: true
    })
  }
  return ( (
    
    <div className="container" >
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
            <div className="my-3">
            <center><button className="btn btn-outline-success">Add Friend</button></center> 
            </div>
            <div className="my-3">
            <center><button className="btn btn-outline-warning ">Chat</button></center> 
            </div>
            <div className="my-3">
            <center><button onClick={authBoi} disabled={auth.dis} className={'btn btn-outline-'+auth.col}>{auth.tex}</button></center> 
            </div>
        </div>
        <div className="col-lg-6 md-hide sm-hide bg-primary badge">
        <div >
        <h2 className="text-gray-dark">Currently working at</h2>
        <h3>{info}</h3>
        </div>
        </div>
        <div className="col-lg-12 col-md-12 sm-hide align-items-lg-end">
        <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
          <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true" onChange={onChange}>Home</a>
          <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false" onChange={onChange}>Profile</a>
          <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false" onChange={onChange}>Contact</a>
        </div>
      </nav>
      <div class="tab-content" id="nav-tabContent">
        <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">...</div>
        <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">...</div>
        <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">...</div>
      </div>
       </div>
        
      </div>
    </div>
  ));
}

export default Profile;