import React, { Fragment ,useContext,useEffect} from 'react'
import ProfileItem from './ProfileItem'
import AlumniContext from '../../context/alumni/alumniContext'
const Profile = (props) => {
  const alumniContext =useContext(AlumniContext);

  const { getProfile, user } = alumniContext;
  useEffect(()=>{
    console.log(props.match.params.id)
    getProfile(props.match.params.id);
    // eslint-disable-next-line
  },[])
  
  return (
    <Fragment>{user == null ? <h2>loading</h2>:
      <ProfileItem user={user}/>}
    </Fragment>
  )
}

export default Profile
