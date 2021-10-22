import React, { Component } from 'react';
import './SingleFullVenue.css';
import axios from 'axios';
import {
    REACT_APP_API_BASE_URL,
    GET_SINGLE_VENUE,
    GET_POINTS,
} from '../../endpoints'
import seedData from '../seedData';
import Point from './Point';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import openModal from '../../actions/openModal';
import Login from '../Login/Login';
import moment from 'moment'
import swal from 'sweetalert';
import loadScript from '../../utilityFunctions/loadScript';

class SingleFullVenue extends Component {

    state = {
        venue: {},
        points: [],
        pointsDescription: [],
        numberOfGuests: 0,
        checkIn: '',
        checkOut: ''
    }

    componentDidMount() {
        const vid = this.props.match.params.vid
        const venueURL = `${REACT_APP_API_BASE_URL}/${GET_SINGLE_VENUE}/${vid}`;
        const pointsURL = `${REACT_APP_API_BASE_URL}/${GET_POINTS}`

        const promises = [];

        promises.push(axios.get(venueURL))
        promises.push(axios.get(pointsURL))

        Promise.all(promises)
            .then((data) => {
                const venue = data[0].data;
                const points = data[0].data.points.split(',');
                const pointsDescription = data[1].data;

                this.setState(
                    {
                        venue,
                        points,
                        pointsDescription
                    }
                )
            })
            .catch((ex) => {
                this.setState({
                    venue: seedData.singleVenue,
                    points: seedData.singleVenue.points,
                    pointsDescription: seedData.pointsDescription
                })
            })

        // axios.get(venueURL)
        //     .then((resposne) => {
        //         this.setState({ venue: resposne.data })
        //         this.setState({ points: [...resposne.data.points.split(',')] })
        //     })
        //     .catch((ex) => {
        //         this.setState(
        //             {
        //                 venue: seedData.singleVenue,
        //                 points: seedData.singleVenue.points
        //             })
        //     })

        // axios.get(pointsURL)
        //     .then((resposne) => {
        //         console.log(resposne.data)
        //     })


    }

    changeNumberOfGuests = (e) => {
        this.setState(
            {
                numberOfGuests: e.target.value
            }
        )
    }

    reserveNow = async (e) => {
    
        const startDayMoment = moment(this.state.checkIn);
        const ednDayMoment = moment(this.state.checkOut);
        console.log(startDayMoment)
        console.log(ednDayMoment)

        const diffDays = ednDayMoment.diff(startDayMoment, 'days');

        if(diffDays < 1){
            swal({
                title: "Check in day must be before Check out day",
                icon: "error",
            })
        }else if(isNaN(diffDays)){
            swal({
                title: "Please make sure your dates are valid",
                icon: "error",
            })
        }else{
            const scriptUrl = 'https://js.stripe.com/v3'
            const stripePublicKey = 'pk_test_5198HtPL5CfCPYJ3X8TTrO06ChWxotTw6Sm2el4WkYdrfN5Rh7vEuVguXyPrTezvm3ntblRX8TpjAHeMQfHkEpTA600waD2fMrT';

            //the below logic will extended to it's own module
            // await new Promise((resolve, reject) => {
            //     //creating a script tag using the DOM functionalities in jas way
            //     const script = document.createElement('script');
            //     script.type = 'text/javascript';
            //     script.src = scriptUrl;

            //     //this code ensures that the script tag will be loaded prior the finish of the await
            //     script.onload = () =>{
            //         resolve()
            //     }
            //     const headEl = document.getElementsByTagName('head')[0]
            //     headEl.appendChild(script)

            //     //this realtes to:
            //     // <script type='text/javascript' src='https://js.stripe.com/v3'></script>
            //     // an putting this tag into the head tag of our application
            
            // })

            await loadScript(scriptUrl)

            const stripe = window.Stripe(stripePublicKey)

            const pricePerNight = this.state.venue.pricePerNight;
            const totalPrice = pricePerNight * diffDays;
        }

    }

    openLogin = () => {
        this.props.openModal('open', <Login />)
    }

    render() {

        const venue = this.state.venue;
        const points = this.state.points

        const generatePointsElements = () => {
            return points.map((point, i) => {
                return (
                    <div key={i}>
                        <Point
                            pointsDescrption={this.state.pointsDescription}
                            point={point}
                        />
                    </div>
                )
            })
        }

        return (
            <div className='row single-venue'>
                <div className='col s12 center'>
                    <img src={venue.imageUrl} />
                </div>
                <div className='col s8 location-details offset-s2'>
                    <div className='col s8 left-details'>
                        <div className='location'>{venue.location}</div>
                        <div className='title'>{venue.title}</div>
                        <div className='guests'>{venue.guests}</div>
                        <div className='divider' />
                        <div>
                            {generatePointsElements()}
                        </div>
                        <div className='details'>
                            {venue.details}
                        </div>
                        <div className='amenities'>
                            {venue.amenities}
                        </div>
                    </div>
                    <div className='col s4 right-details'>
                        <div className='price-per-day'>
                            ${venue.pricePerNight} <span>per day</span>
                        </div>
                        <div className='rating'>{venue.rating}</div>
                        <div className='col s6'>
                            Check-In
                            <input type='date' onChange={(e) => this.setState({ checkIn: e.target.value })} />
                        </div>
                        <div className='col s6'>
                            Check-Out
                            <input type='date' onChange={(e) => this.setState({ checkOut: e.target.value })} />
                        </div>
                        <div className='col s12'>
                            <select className='browser-default' onChange={this.changeNumberOfGuests}>
                                <option value='1'>1 Guest</option>
                                <option value='2'>2 Guests</option>
                                <option value='3'>3 Guests</option>
                                <option value='4'>4 Guests</option>
                                <option value='5'>5 Guests</option>
                                <option value='6'>6 Guests</option>
                                <option value='7'>7 Guests</option>
                                <option value='8'>8 Guests</option>
                            </select>
                        </div>
                        <div className='col s12 center'>
                            {this.props.auth.token ?
                                <button onClick={this.reserveNow} className='btn red accent-2'>Reserve</button>
                                :
                                <div>You must <span className='text-link' onClick={this.openLogin}>Log in</span> to reserve</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return (
        {
            auth: state.auth
        }
    )
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        openModal: openModal
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleFullVenue);