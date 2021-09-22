import React, { Component } from 'react';
import './Home.css'
import SearchBox from './SearchBox';
import axios from 'axios';
import {
    REACT_APP_API_BASE_URL,
    GET_RECOMMENDED_CITES
} from '../../endpoints'
import Spinner from '../../utility/Spinner/Spinner'

class Home extends Component {

    state = {
        cities: [],
    }

    async componentDidMount() {
        const recommendedCities = await axios.get(`${REACT_APP_API_BASE_URL}/${GET_RECOMMENDED_CITES}`)
        const newState = { ...this.state }
        newState.cities = recommendedCities;
        this.setState(newState)
    }

    render() {
        if (this.state.cities.length === 0) {
            return (
                <Spinner />
            )
        }
        return (
            <div className='container-fluid'>
                <div className='row'>
                    <div className='home col s12'>
                        <div className='upper-fold'>
                            <SearchBox />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home