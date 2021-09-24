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
    GET_ACTIVITIES_TODAY
} from '../../endpoints'
import Spinner from '../../utility/Spinner/Spinner';
import Cities from '../../utility/City/Cities'
import seedData from '../seedData'
import Activities from '../../utility/Activity/Acitivities';


class Home extends Component {

    state = {
        cities: [],
        citiesEurope: {},
        citiesAsia: {},
        citiesExotic: {},
        activites: [],
    }

    async componentDidMount() {

        const citiesURL = `${REACT_APP_API_BASE_URL}/${GET_RECOMMENDED_CITES}`;
        const europeCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_EUROPE}`;
        const asiaCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_ASIA}`;
        const exoticCitiesURL = `${REACT_APP_API_BASE_URL}/${GET_CITIES_EXOTIC}`;

        const citiesPromises = [];

        citiesPromises.push(axios.get(citiesURL));
        citiesPromises.push(axios.get(europeCitiesURL));
        citiesPromises.push(axios.get(asiaCitiesURL));
        citiesPromises.push(axios.get(exoticCitiesURL));

        Promise.all(citiesPromises)
            .then((data) => {
                const recCities = data[0].data;
                const citiesEurope = data[1].data;
                const citiesAsia = data[2].data;
                const citiesExotic = data[3].data;

                this.setState({
                    cities: recCities,
                    citiesEurope: citiesEurope,
                    citiesAsia: citiesAsia,
                    citiesExotic: citiesExotic,
                })
            })
            .catch((er) => {
                console.error(er)

                this.setState({
                    cities: seedData.recommendedCities,
                    citiesEurope: seedData.citiesInEurope,
                    citiesAsia: seedData.citiesInAsia,
                    citiesExotic: seedData.citiesExotic,
                })
            })

        const activitiesURL = `${REACT_APP_API_BASE_URL}/${GET_ACTIVITIES_TODAY}`;

        const activites = await axios.get(activitiesURL)
        this.setState({
            activites: activites.data
        })
    }

    render() {
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
                            <Activities activities={this.state.activites}/>
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
                    </div>
                </div>
            </>
        )
    }
}

export default Home