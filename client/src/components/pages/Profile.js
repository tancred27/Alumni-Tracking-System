import React, { Fragment ,useContext,useEffect} from 'react'
import ProfileItem from './ProfileItem'
import AlumniContext from '../../context/alumni/alumniContext'
import jwt from 'jsonwebtoken';

const Profile = (props) => {
  const alumniContext =useContext(AlumniContext);
  let alumni=true;
  useEffect(()=>{
    console.log(props.match.params.id)
    alumniContext.getProfile(props.match.params.id);
    if(localStorage.token){
      const decoded = jwt.verify(localStorage.token, 'secrettoken')
      if(decoded.user){
        alumni=true;
        alumniContext.getNotifications(decoded.user.id);
        
      }else{
        alumni=false;
      }
    }
    
  },[])
  
  return (
    <Fragment>{alumniContext.users.length==0&&(alumni!=true||alumniContext.notification)?<h2>loading</h2>:
      <ProfileItem user={alumniContext.users[0]} notf={alumniContext.notification} alumni={alumni}/>}
    </Fragment>
  )
}

export default Profile
