import React, { Component } from "react";
import './PaymentSuccess.css'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    REACT_APP_API_BASE_URL,
    PAYMENT_SUCCESS
} from '../../endpoints';
import Spinner from "../../utility/Spinner/Spinner";
import moment from 'moment'
import { Link } from "react-router-dom";
import axios from 'axios';
library.add(faLongArrowAltRight);

class PaymentSuccess extends Component {


    state = {
        reservationDetails: {},
        venueData: {},
        usereservenueDataetailsata: {},
        loading: true
    }

    async componentDidMount() {
        const stripeToken = this.props.match.params.stripeToken;
        const token = this.props.auth.token;
        const requestData = { stripeToken, token }
        const requestUrl = `${REACT_APP_API_BASE_URL}/${PAYMENT_SUCCESS}`
        const response = await axios.post(requestUrl, requestData)

        this.setState({
            reservationDetails: response.data.reservationDetails,
            venueData: response.data.reservationDetails.venueData,
            usereservenueDataetailsata: response.data.usereservenueDataetailsata,
            loading: false
        })
    }

    render() {

        if (this.state.loading) {
            return (
                <Spinner />
            )
        }
        const reservenueDataetails = this.state.reservationDetails;
        const venueData = this.state.venueData;
        return (
            <div className="reservation-success row">
                <h1 className="col m12 center">Start Packing!</h1>
                <div className="resv-details col s8 offset-s2">
                    <div className="confirmed col m12 row">
                        <FontAwesomeIcon icon="long-arrow-alt-right" size="1x" color="#ED0000" />Confirmed: {reservenueDataetails.diffDays} nights in {venueData.location}
                        <div className="header-text">
                            <div>Booked by: {this.props.auth.email}</div>
                            <div>{moment().format('MMMM Do, YYYY')}</div>
                        </div>
                    </div>
                    <div className="confirmed-detail row">
                        <div className="col m5">
                            <div className="boreservenueDataetailsered col">
                                <div className="col m12 upper">
                                    <div className="left">Check in</div><div className="right">Check out</div>
                                </div>
                                <div className="col m12 lower">
                                    <div className="left">{moment(reservenueDataetails.checkIn).format('MMM Do, YYYY')}</div><div className="right">{moment(reservenueDataetails.checkOut).format('MMM Do, YYYY')}</div>
                                </div>
                                <div className="col m12 title-text">
                                    {venueData.title}
                                </div>
                                <div className="col m12 details">
                                    {venueData.details}
                                </div>
                            </div>
                        </div>


                        <div className="col m7">
                            <div className="boreservenueDataetailsered col">
                                <div className="col m12 upper charges">
                                    <div className="charges-text col m12">Charges</div>
                                    <div className="row col m12">
                                        <div className="left">${reservenueDataetails.pricePerNight} x {reservenueDataetails.diffDays} days</div>
                                        <div className="right">${reservenueDataetails.totalPrice}</div>
                                    </div>
                                    <div className="row col m12">
                                        <div className="left">Discount</div>
                                        <div className="right">$0</div>
                                    </div>
                                    <div className="row col m12 total">
                                        <div className="left">TOTAL</div>
                                        <div className="right">${reservenueDataetails.totalPrice}</div>
                                    </div>
                                </div>
                                <div className="col m12 row">To rview or make changes to your reservation in the future, visit your <Link to="/account">account page</Link>.</div>
                                <div className="col m12 resv-image"><img src={venueData.imageUrl} /></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToPros(state) {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToPros)(PaymentSuccess)


