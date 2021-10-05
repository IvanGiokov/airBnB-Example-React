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

class SingleFullVenue extends Component {

    state = {
        venue: {},
        points: [],
        pointsDescription: []
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

    reserveNow = (e)=>{
        console.log('User wants to reserve')
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
                            <input type='date'/>
                        </div>
                        <div className='col s6'>
                            Check-Out
                            <input type='date'/>
                        </div>
                        <div className='col s12'>
                            <select className='browser-default'>
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
                            <button onClick={this.reserveNow} className='btn red accent-2'>Reserve</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleFullVenue;