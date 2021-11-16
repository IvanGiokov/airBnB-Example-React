import React, { Component, useState, useEffect } from 'react';
import './Search.css';
import '../Home/Home.css'
import Spinner from '../../utility/Spinner/Spinner';
import axios from 'axios';
import Cities from '../../utility/City/Cities';
import Activities from '../../utility/Activity/Acitivities';
import Venues from '../../utility/Venue/Venues';
import {
    REACT_APP_API_BASE_URL,
    GET_SEARCH
} from '../../endpoints';

//HOOKS VERSION
function Search(props) {
    const [activities, setActivities] = useState([]);
    const [cities, setCities] = useState([]);
    const [venues, setVenues] = useState([]);
    const [apiResponse, setApiResponse] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const location = props.match.params.location;
            const url = `${REACT_APP_API_BASE_URL}/${GET_SEARCH}/${location}`;
            const resp = await axios.get(url);

            setActivities(resp.data.activities)
            setCities(resp.data.cities)
            setVenues(resp.data.venues)
            setApiResponse(true)
        }
        fetchData()
    }, [])

    if (!apiResponse) {
        return <Spinner />
    }
    return (
        <div className="container-fluid lower-fold content">
            <div className="row">
                <div className="col s12">
                    <Cities cities={cities} header="Cities Matching Your Search" />
                </div>
                <div className="col s12">
                    <Activities activities={activities} header="Activies Matching Your Search" />
                </div>
                <div className="col s12">
                    <Venues venues={venues} header="Venues matching your search" />
                </div>
            </div>
        </div>
    )

}

//CLASS Component version
// class Search extends Component{

//     state = {
//         activities: [],
//         cities: [],
//         venues: [],
//         apiResponse: false,
//     }

//     async componentDidMount(){
//         const location = this.props.match.params.location;
//         const url = `${REACT_APP_API_BASE_URL}/${GET_SEARCH}/${location}`;
//         const resp = await axios.get(url);
//         this.setState({
//             activities: resp.data.activities,
//             cities: resp.data.cities,
//             venues: resp.data.venues,
//             apiResponse: true,
//         })
//     }

//     render(){
//         if(!this.state.apiResponse){
//             return <Spinner />
//         }

//         return (
//             <div className="container-fluid lower-fold content">
//                 <div className="row">
//                     <div className="col s12">
//                         <Cities cities={this.state.cities} header="Cities Matching Your Search" />
//                     </div>            
//                     <div className="col s12">
//                         <Activities activities={this.state.activities} header="Activies Matching Your Search" />
//                     </div>            
//                     <div className="col s12">
//                         <Venues venues={this.state.venues} header="Venues matching your search" />
//                     </div>            

//                 </div>
//             </div>
//         )
//     }
// }

export default Search;