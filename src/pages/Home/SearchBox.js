import React, { Component } from 'react';
import './SearchBox.css'

class SearchBox extends Component {
    state = {
        where: "",
        checkIn: "",
        checkOut: "",
        guests: 0
    }

    changeWhere = (e) => {
        const newState = { ... this.state }
        newState.where = e.target.value;

        this.setState(newState)
    }

    changeCheckIn = (e) => {
        const newState = { ... this.state }
        newState.checkIn = e.target.value;

        this.setState(newState)
    }

    changeCheckOut = (e) => {
        const newState = { ... this.state }
        newState.checkOut = e.target.value;

        this.setState(newState)
    }

    changeGuests = (e) => {
        const newState = { ... this.state }
        newState.guests = e.target.value;

        this.setState(newState)
    }


    render() {
        return (
            <div className='home-search-box col m4'>
                <h1>Book unique places to stay and things to do</h1>
                <form className='search-box-form'>
                    <div className='col m12'>
                        <div className='input-field' id='where'>
                            <div className='form-label'>Where</div>
                            <input
                                // className='browser-default'
                                type='text'
                                placeholder='Anywhere'
                                value={this.state.where}
                                onChange={this.changeWhere}
                            />
                        </div>
                    </div>
                    <div className='col m6'>
                        <div className='input-field' id='check-in'>
                            <div className='form-label'>Check-in</div>
                            <input
                                // className='browser-default'
                                type='date'
                                value={this.state.checkIn}
                                onChange={this.changeCheckIn}
                            />
                        </div>
                    </div>
                    <div className='col m6'>
                        <div className='input-field' id='check-in'>
                            <div className='form-label'>Check-out</div>
                            <input
                                // className='browser-default'
                                type='date'
                                value={this.state.checkOut}
                                onChange={this.changeCheckOut}
                            />
                        </div>
                    </div>
                    <div className='col m12'>
                        <div className='input-field' id='where'>
                            <div className='form-label'>Guest</div>
                            <input
                                // className='browser-default'
                                type='number'
                                placeholder='Number of Guests'
                                value={this.state.guests}
                                onChange={this.changeGuests}
                            />
                        </div>
                    </div>
                    <div className='col m12 submit-btn'>
                        <div className='input-field' id='submit-btn'>
                            <input
                                className='btn-large waves-effect waves-light red accent-2'
                                type='submit'
                                value='SUBMIT'
                            />
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}

export default SearchBox