import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import Login from '../../pages/Login/Login'
import SignUp from '../../pages/Login/SignUp'

class NavBar extends Component {
    render() {

        let navBackgroundColor = 'transparent'

        if (this.props.location.pathname !== '/') {
            //the user is on home page
            navBackgroundColor = 'black'
        }

        return (
            <div className='container-fluid nav'>
                <nav className={navBackgroundColor}>
                    <div className='row'>
                        <div className='nav-wrapper'>
                            <Link to='/' className='brand-logo left'>airbnb</Link>
                            <ul id='nav-mobile' className='right'>
                                <li><Link to="/">English (US)</Link></li>
                                <li><Link to="/">$ USD</Link></li>
                                <li><Link to="/">Become a host</Link></li>
                                <li><Link to="/">Help</Link></li>
                                <li onClick={() =>
                                    this.props.openModal('open', <SignUp />)
                                }>
                                    Sign up
                                </li>
                                <li onClick={() =>
                                    this.props.openModal('open', <Login />)
                                }>
                                    Log in
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        )
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal
    }, dispatcher)
}

export default connect(null, mapDispatchToProps)(NavBar)