import React, { useContext, Fragment } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {

    const authContext = useContext(AuthContext);

    const { isAuthenticated, logout, user } = authContext;

    const guestLinks = (
        <Fragment>
            <li><Link to='/register'>Register</Link></li>
            <li><Link to='/login'>Login</Link></li>
        </Fragment>
    );

    const onLogout = () => {
        logout();
    }

    const userLinks = (
        <Fragment>
            <li><Link to='/'>Home</Link></li>
            <li><Link to = '/'>Profile</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/colleges'>Colleges</Link></li>
            <li>
                <a onClick={onLogout} href="/#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const collegeLinks = (
        <Fragment>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/users'>Users</Link></li>
            <li><Link to='/alumni'>Alumni</Link></li>
            <li><Link to='/colleges'>Colleges</Link></li>
            <li>
                <a onClick={onLogout} href="/#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    ) 

    const dirLinks = (
        <Fragment>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About</Link></li>
            <li><Link to='/colleges'>Colleges</Link></li>
            <li>
                <a onClick={onLogout} href="/#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    )

    let links = '';
    if (isAuthenticated){
        try{
            if (user.isUser){
                links = userLinks
            }
            else if (user.isCollege){
                links = collegeLinks
            }
            else{
                links = dirLinks
            }
        }
        catch(err){
            console.log(err.message);
        }
        
    }
    else{
        links = guestLinks
    }
    


    return (
        <div className="navbar bg-primary">
            <h1>
                <i className={icon} /> {title}
            </h1>
            <ul>
                {links}
            </ul>     
        </div>
    )

}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
    title: 'Alumni Tracking',
    icon: 'fas fa-users'
}
export default Navbar
