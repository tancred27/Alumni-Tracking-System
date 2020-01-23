import React, { Fragment ,useContext,useEffect} from 'react'
import ProfileItem from './ProfileItem'
import AlumniContext from '../../context/alumni/alumniContext'
const Profile = (props) => {
  const alumniContext =useContext(AlumniContext);
  useEffect(()=>{
    console.log(props.match.params.id)
    alumniContext.getProfile(props.match.params.id);
  },[])
  return (
    <Fragment>{alumniContext.users.length==0?<h2>loading</h2>:
      <ProfileItem user={alumniContext.users[0]}/>}
    </Fragment>
  )
}

export default Profile
