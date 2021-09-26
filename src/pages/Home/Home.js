import React, { Component } from 'react';
import './Home.css'
import SearchBox from './SearchBox';
import axios from 'axios';
import {
    REACT_APP_API_BASE_URL,
    GET_RECOMMENDED_CITES,
    GET_CITIES_EUROPE,
    GET_CITIES_ASIA,
    GET_CITIES_EXOTIC,
    GET_ACTIVITIES_TODAY,
    GET_VENUES_RECOMMENDED,
} from '../../endpoints'
import Spinner from '../../utility/Spinner/Spinner';
import Cities from '../../utility/City/Cities'
import seedData from '../seedData'
import Activities from '../../utility/Activity/Acitivities';
import Venues from '../../utility/Venue/Venues'


class Home extends Component {

    state = {
        cities: [],
        citiesEurope: {},
        citiesAsia: {},
        citiesExotic: {},
        activities: [],
        venuesRecommended: {}
    }

    async componentDidMount() {

        const citiesURL = `${REACT_APP_API_BASE_URL}/${GET_RECOMMENDED_CITES}`;
        const europeCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_EUROPE}`;
        const asiaCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_ASIA}`;
        const exoticCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_EXOTIC}`;
        const activitiesURL = `${REACT_APP_API_BASE_URL}/${GET_ACTIVITIES_TODAY}`;
        const venuesRecommendedURL = `${REACT_APP_API_BASE_URL}/${GET_VENUES_RECOMMENDED}`

        const promises = [];

        promises.push(axios.get(citiesURL));
        promises.push(axios.get(europeCitiesURL));
        promises.push(axios.get(asiaCitiesURL));
        promises.push(axios.get(exoticCitiesURL));
        promises.push(axios.get(activitiesURL));
        promises.push(axios.get(venuesRecommendedURL))

        Promise.all(promises)
            .then((data) => {
                const recCities = data[0].data;
                const citiesEurope = data[1].data;
                const citiesAsia = data[2].data;
                const citiesExotic = data[3].data;
                const activities = data[4].data;
                const venuesRecommended = data[5].data

                this.setState({
                    cities: recCities,
                    citiesEurope: citiesEurope,
                    citiesAsia: citiesAsia,
                    citiesExotic: citiesExotic,
                    activities : activities,
                    venuesRecommended: venuesRecommended
                })
            })
            .catch((er) => {
                console.error(er)

                this.setState({
                    cities: seedData.recommendedCities,
                    citiesEurope: seedData.citiesInEurope,
                    citiesAsia: seedData.citiesInAsia,
                    citiesExotic: seedData.citiesExotic,
                    activities: seedData.activites,
                    venuesRecommended: seedData.venuesRecommended
                })
            })
    }

    render() {

        console.log(this.state)
        if (this.state.cities.length === 0) {
            return (
                <Spinner />
            )
        }

        return (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='home col s12'>
                            <div className='upper-fold'>
                                <SearchBox />
                            </div>
                        </div>

                    </div>
                </div>
                <div className='conainer-fluid lower-fold'>
                    <div className='row'>
                        <div className='col s12'>
                            <Cities cities={this.state.cities} header='Recommended cities for you' />
                        </div>
                        <div className='col s12'>
                            <Activities activities={this.state.activities} header='Today in your area'/>
                        </div>
                        <div className='col s12'>
                            <Cities cities={this.state.citiesEurope.cities} header={this.state.citiesEurope.header} />
                        </div>
                        <div className='col s12'>
                            <Cities cities={this.state.citiesAsia.cities} header={this.state.citiesAsia.header} />
                        </div>
                        <div className='col s12'>
                            <Cities cities={this.state.citiesExotic.cities} header={this.state.citiesExotic.header} />
                        </div>
                        <div className='col s12'>
                            <Venues venues={this.state.venuesRecommended.venues} header={this.state.venuesRecommended.header}/>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Home