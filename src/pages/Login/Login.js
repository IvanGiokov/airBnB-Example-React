import React, { Component, useState } from 'react';
import './Login.css';
import SignUp from './SignUp';
import { connect, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import regAction from '../../actions/regAction';
import {
    REACT_APP_API_BASE_URL,
    POST_LOGIN
} from '../../endpoints';
import axios from 'axios';
import swal from 'sweetalert';


function Login(props) {

    const disptach = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitLogin = async (e) => {
        e.preventDefault()
        const requestUrl = `${REACT_APP_API_BASE_URL}/${POST_LOGIN}`
        const reqData = {
            email: email,
            password: password
        }

        const response = await axios.post(requestUrl, reqData)

        const respMessage = response.data.msg

        ////
        //response.data.msg could be:
        //errors:
        //-badPass
        //-noEmail
        //success:
        //-loggedIn

        if (respMessage === 'badPass') {
            swal({
                title: "Wrong password",
                text: "The password you have provided does not match the email address",
                icon: "error",
            })
        } else if (respMessage === 'noEmail') {
            swal({
                title: "Email does not exist",
                text: "The email you have provided does not have a registration",
                icon: "error",
            })
        } else if (respMessage === 'loggedIn') {
            swal({
                title: "Success",
                icon: "success",
            })

            //here we call our register action
            //NOTE useDispatch can be placed inside of async function
            //First way, we pass the action creator function
            disptach(regAction(response.data));
            //Second way or we pass the action object directly
            // disptach({
            //     type: 'REGISTER_ACTION',
            //     payload: response.data
            // })
            disptach(openModal('closed', ''))
        }
    }

    return (
        <div className="login-form">
            <form onSubmit={submitLogin}>
                <button className="facebook-login">Connect With Facebook</button>
                <button className="google-login">Connect With Google</button>
                <div className="login-or center">
                    <span>or</span>
                    <div className="or-divider"></div>
                </div>
                <input type="text" className="browser-default" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} value={email} />
                <input type="password" className="browser-default" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                <button className="sign-up-button">Login</button>
                <div className="divider"></div>
                <div>Don't have an account?
                    <span
                        className='pointer'
                        style={{
                            marginLeft: '5px'
                        }}
                        onClick={() => disptach(openModal('open', <SignUp />))}
                    >Sign up</span>
                </div>
            </form>
        </div>
    )
}

//CLASS VERSION
// class Login extends Component {

//     state = {
//         email: '',
//         password: ''
//     }

//     changeEmail = (e) => {
//         this.setState({
//             email: e.target.value
//         })
//     }

//     changePassword = (e) => {
//         this.setState({
//             password: e.target.value
//         })
//     }

//     submitLogin = async (e) => {
//         e.preventDefault()
//         const requestUrl = `${REACT_APP_API_BASE_URL}/${POST_LOGIN}`
//         const reqData = {
//             email: this.state.email,
//             password: this.state.password
//         }

//         const response = await axios.post(requestUrl, reqData)

//         const respMessage = response.data.msg

//         ////
//         //response.data.msg could be:
//         //errors:
//         //-badPass
//         //-noEmail
//         //success:
//         //-loggedIn

//         if (respMessage === 'badPass') {
//             swal({
//                 title: "Wrong password",
//                 text: "The password you have provided does not match the email address",
//                 icon: "error",
//             })
//         } else if (respMessage === 'noEmail') {
//             swal({
//                 title: "Email does not exist",
//                 text: "The email you have provided does not have a registration",
//                 icon: "error",
//             })
//         } else if (respMessage === 'loggedIn') {
//             swal({
//                 title: "Success",
//                 icon: "success",
//             })

//             //here we call our register action
//             this.props.regAction(response.data)
//             this.props.openModal('closed', '')
//         }

//     }

//     render() {
//         return (
//             <div className="login-form">
//                 <form onSubmit={this.submitLogin}>
//                     <button className="facebook-login">Connect With Facebook</button>
//                     <button className="google-login">Connect With Google</button>
//                     <div className="login-or center">
//                         <span>or</span>
//                         <div className="or-divider"></div>
//                     </div>
//                     <input type="text" className="browser-default" placeholder="Email address" onChange={this.changeEmail} />
//                     <input type="password" className="browser-default" placeholder="Password" onChange={this.changePassword} />
//                     <button className="sign-up-button">Login</button>
//                     <div className="divider"></div>
//                     <div>Don't have an account?
//                         <span
//                             className='pointer'
//                             style={{
//                                 marginLeft: '5px'
//                             }}
//                             onClick={
//                                 () => {
//                                     this.props.openModal('open', <SignUp />)
//                                 }
//                             }
//                         >Sign up</span>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

// function mapDispatchToProps(dispatcher) {
//     return bindActionCreators({
//         openModal: openModal,
//         regAction: regAction
//     }, dispatcher)
// }

// export default connect(null, mapDispatchToProps)(Login);
export default Login;