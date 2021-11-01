import React, { Component } from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import Login from '../../pages/Login/Login';
import SignUp from '../../pages/Login/SignUp';
import logoutAction from '../../actions/logoutAction';

class NavBar extends Component {

    componentDidUpdate(oldProps) {
        if (oldProps.userData.token !== this.props.userData.token) {
            this.props.openModal('closed', '')
        }
    }

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
                                {this.props.userData.email ?
                                    <>
                                        <li><Link to='/account'>Hello, {this.props.userData.email}</Link></li>
                                        <li className='logout' onClick={() => {
                                            this.props.logoutAction()
                                        }
                                        }>Logout</li>
                                    </>
                                    :
                                    <>
                                        <li
                                            className="login-signup"
                                            onClick={() =>
                                                this.props.openModal('open', <SignUp />)
                                            }>
                                            Sign up
                                        </li>
                                        <li
                                            className="login-signup"
                                            onClick={() =>
                                                this.props.openModal('open', <Login />)
                                            }>
                                            Log in
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        userData: state.auth
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal,
        logoutAction: logoutAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)