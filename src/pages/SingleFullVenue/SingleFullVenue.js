import React, { Component } from 'react';
import './SingleFullVenue.css';
import axios from 'axios';
import {
    REACT_APP_API_BASE_URL,
    GET_SINGLE_VENUE,
    GET_POINTS,
} from '../../endpoints'
import seedData from '../seedData';

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
                    points: seedData.singleVenue.points
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

    render() {
        const venue = this.state.venue;
        const points = this.state.points

        const generatePointsElements = () => {
            return points.map((point, i) => {
                return (
                    <div key={i}>{point}</div>
                )
            })
        }

        return (
            <div className='row single-venue'>
                <div className='col s12 center'>
                    <img src={venue.imageUrl} />
                </div>
                <div className='col s8 location-details offset-s2'>
                    <div className='location'>{venue.location}</div>
                    <div className='title'>{venue.title}</div>
                    <div className='guests'>{venue.guests}</div>
                    <div className='divider' />
                    <div>
                        {generatePointsElements()}
                    </div>
                </div>
            </div>
        )
    }
}

export default SingleFullVenue;