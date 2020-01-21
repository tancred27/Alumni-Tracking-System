import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, icon }) => {
    return (
        <div>
            <div className="navbar bg-primary">
                <h1>
                    <i className={icon} /> {title}
                </h1>
                <ul>
                    <li>
                        <Link to='/'>Home</Link>
                        <Link to='/about'>About</Link>
                    </li>
                </ul>
            </div>
            <div className="footer">Made By Niggas
            </div>
        </div>
        
    )

}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
};

Navbar.defaultProps = {
    title: 'Alumni Tracking',
    icon: 'fas fa-id-card-alt'
}

export default Navbar
