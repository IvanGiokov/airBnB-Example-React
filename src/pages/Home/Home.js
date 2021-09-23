import React, { Component } from 'react';
import './Home.css'
import SearchBox from './SearchBox';
import axios from 'axios';
import {
    REACT_APP_API_BASE_URL,
    GET_RECOMMENDED_CITES
} from '../../endpoints'
import Spinner from '../../utility/Spinner/Spinner';
import Cities from '../../utility/City/Cities'

class Home extends Component {

    state = {
        cities: [],
    }

    async componentDidMount() {
        const response = await axios.get(`${REACT_APP_API_BASE_URL}/${GET_RECOMMENDED_CITES}`)

        if (response.statusText === "OK") {
            const newState = { ...this.state }
            newState.cities = response.data;
            this.setState(newState)
        }
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
                    <div className='col s12'>
                        <Cities cities={this.state.cities} />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home