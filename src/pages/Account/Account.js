import React, { Component } from "react";
import './Account.css';
import { connect } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { Route } from 'react-router-dom';
import Bookings from "./Bookings";
import AccountSideBar from "./AccountSideBar";
import ChangePassword from "./ChangePassword";

class Account extends Component {

    state = {
        pastBookings: [],
        upcomingBookings: []
    }

    componentDidMount() {

    }

    render() {
        return (
            <div className='account container-fluid'>
                <AccountSideBar />
                <div className='row'>
                    <div className='col s8 offset-s3'>
                        <Route exact path='/account' render={() => {
                            return (
                                <h1>Choose and option from the sidebar on the left</h1>
                            )
                        }}
                        />
                        <Route exact path='/account/reservations/confirmed' component={Bookings} />
                        <Route exact path='/account/reservations/past' component={Bookings} />
                        <Route exact path='/account/change-pass' component={ChangePassword} />
                    </div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps)(Account);
