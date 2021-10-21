import React, { Component } from 'react';
import './CityVenues.css'
import {
    REACT_APP_API_BASE_URL,
    GET_CITY_VENUES
} from '../../endpoints'
import axios from 'axios';
import Spinner from '../../utility/Spinner/Spinner';
import Venues from '../../utility/Venue/Venues'

class CityVenues extends Component {

    state = {
        header: '',
        venues: []
    }

    async componentDidMount() {
        const cityName = this.props.match.params.cityName
        const requestUrl = `${REACT_APP_API_BASE_URL}/${GET_CITY_VENUES}/${cityName}`

        const response = await axios.get(requestUrl);
        this.setState({
            header: response.data.header,
            venues: response.data.venues
        })
    }

    render() {

        if (!this.state.header) {
            return (
                <Spinner />
            )
        }

        return (
            <div className='row'>
                <Venues venues={this.state.venues} header={this.state.header} />
            </div>
        )
    }

}

export default CityVenues