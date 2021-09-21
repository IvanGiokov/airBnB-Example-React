import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom'

class NavBar extends Component {
    render() {

        let navBackgroundColor = 'transparent'

        if(this.props.location.pathname !== '/'){
            //the user is on home page
            navBackgroundColor = 'black'
        }

        return (
            <div className='container-fluid nav'>
                <nav className={navBackgroundColor}>
                    <div className='row'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='left'>airBnB</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to="/">English (US)</Link></li>
                                <li><Link to="/">$ USD</Link></li>
                                <li><Link to="/">Become a host</Link></li>
                                <li><Link to="/">Help</Link></li>
                                <li><Link to="/">Sign up</Link></li>
                                <li><Link to="/">Log in</Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        )
    }
}

export default NavBar