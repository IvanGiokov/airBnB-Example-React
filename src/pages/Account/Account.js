import React, { Component } from "react";
import './Account.css';
import { connect } from "react-redux";
import axios from "axios";
import moment from 'moment';
import { Route } from 'react-router-dom';
import Bookings from "./Bookings";
import AccountSideBar from "./AccountSideBar";
import ChangePassword from "./ChangePassword";
import {
    REACT_APP_API_BASE_URL,
    GET_BOOKINGS
} from '../../endpoints'

class Account extends Component {

    state = {
        pastBookings: [],
        upcomingBookings: []
    }

    async componentDidMount() {
        const requestUrl = `${REACT_APP_API_BASE_URL}/${GET_BOOKINGS}`;
        const requestData = {
            token: this.props.auth.token
        }
        const response = await axios.post(requestUrl, requestData)
        let pastBookings = []
        let upcomingBookings = []

        response.data.forEach(booking => {
            const today = moment() // get today's date so we know which booking are upcomming and which are passed
            const checkOutDate = moment(booking.checkOut)
            const diffDays = checkOutDate.diff(today, 'days')
            if (diffDays < 0) {
                pastBookings.push(booking)
            } else {
                upcomingBookings.push(booking)
            }
        });

        this.setState({
            pastBookings,
            upcomingBookings
        })

    }

    render() {
        const { pastBookings, upcomingBookings } = this.state
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
                        {/*First way of passing props to Components in Routes */}
                        <Route exact path='/account/reservations/confirmed' render={() => {
                            return <Bookings type='upcoming' bookings={upcomingBookings} />
                        }} />
                        {/*Second way of passing props to Components in Routes */}
                        <Route exact path='/account/reservations/past'>
                            <Bookings type='past' bookings={pastBookings} />
                        </Route>
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
