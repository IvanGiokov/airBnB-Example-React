import React, { Component } from 'react';
import Login from './Login';
import './Login.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import axios from 'axios';
import { REACT_APP_API_BASE_URL, POST_SIGNUP } from '../../endpoints'
import swal from 'sweetalert';
import regAction from '../../actions/regAction';

class SignUp extends Component {

    constructor() {
        super()
        this.state = {
            lowerPartOfForm: <button type='button' onClick={this.showInputs} className="sign-up-button">Sign up with email</button>,
            email: '',
            password: ''
        }
    }

    showInputs = () => {
        this.setState({
            lowerPartOfForm: <SignUpInputFields changeEmail={this.changeEmail} changePassword={this.changePassword} />
        })
    }

    changeEmail = (e) => {
        this.setState({
            email: e.target.value
        })
    }

    changePassword = (e) => {
        this.setState({
            password: e.target.value
        })
    }

    submitSignUp = async (e) => {
        e.preventDefault()
        const requestUrl = `${REACT_APP_API_BASE_URL}/${POST_SIGNUP}`
        const data = {
            email: this.state.email,
            password: this.state.password
        }
        const response = await axios.post(requestUrl, data)

        const respMessage = response.data.msg;

        ////
        //response.data.msg could be:
        //-invalidData
        //-userAdded
        //-userExists

        if (respMessage === 'userExists') {
            swal({
                title: "Email Exists",
                text: "The email you provided is already reqistered. Please you another email",
                icon: "error",
            })
        } else if (respMessage === 'invalidData') {
            swal({
                title: "Invalid email/password",
                text: "Please provide a valid email and password",
                icon: "error",
            })
        } else if (respMessage === 'userAdded') {
            swal({
                title: "Success",
                icon: "success",
            })
            //here we call our register action
            this.props.regAction(response.data)
        }
    }

    render() {
        return (
            <div className="login-form">
                <form onSubmit={this.submitSignUp}>
                    <button className="facebook-login">Connect With Facebook</button>
                    <button className="google-login">Connect With Google</button>
                    <div className="login-or center">
                        <span>or</span>
                        <div className="or-divider"></div>
                    </div>
                    {this.state.lowerPartOfForm}
                    <div className="divider"></div>
                    <div>
                        Already have an account?
                        <span
                            className='pointer'
                            style={{
                                marginLeft: '5px'
                            }}
                            onClick={
                                () => {
                                    this.props.openModal('open', <Login />)
                                }
                            }>
                            Log in
                        </span>
                    </div>
                </form>
            </div>

        )
    }
}

function mapStateToProps(state) {
    return {
        auth: state.auth
    }
}

function mapDispatchToProps(dispatcher) {
    return bindActionCreators({
        openModal: openModal,
        regAction: regAction
    }, dispatcher)
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);

const SignUpInputFields = (props) => {

    return (
        <div className='sign-up-wrapper'>
            <div className='col m12'>
                <div className='input-field' id='email'>
                    <div className='form-label'>Email</div>
                    <input className="browser-default" placeholder='Email' type='text' onChange={props.changeEmail} />
                </div>
                <div className='input-field' id='password'>
                    <div className='form-label'>Password</div>
                    <input className="browser-default" placeholder='Password' type='password' onChange={props.changePassword} />
                </div>
            </div>
            <div className='col m12'>
                <button type='submit' className='btn red accent-2'>Signup</button>
            </div>
        </div>
    )
}