import React, { Component, useState } from 'react';
import './SearchBox.css';
import useControlledInput from '../../customHooks/useControlledInput';

//HOOKS VERSION
function SearchBox(props) {

    //USING CUSTOM HOOKS
    const where = useControlledInput('');
    const checkIn = useControlledInput('');
    const checkOut = useControlledInput('');
    const guests = useControlledInput(0);



    //USING USESTATE HOOK
    // const [where, setWhere] = useState('');
    // const [checkIn, setCheckIn] = useState('');
    // const [checkOut, setCheckOut] = useState('');
    // const [guests, setGuests] = useState(0)

    const submitSearch = (e) => {
        e.preventDefault()
        props.history.push(`/search/${where.value}`)
    }

    return (
        <div className='home-search-box col m4'>
            <h1>Book unique places to stay and things to do</h1>
            <form onSubmit={submitSearch} className='search-box-form'>
                <div className='col m12'>
                    <div className='input-field' id='where'>
                        <div className='form-label'>Where</div>
                        <input
                            // className='browser-default'
                            type='text'
                            placeholder='Anywhere'
                            //using the custom hook
                            {...where}
                            //or put them into separate lines
                            // value={where.value}
                            // onChange={(e) => where.onchange(e)}
                        />
                    </div>
                </div>
                <div className='col m6'>
                    <div className='input-field' id='check-in'>
                        <div className='form-label'>Check-in</div>
                        <input
                            // className='browser-default'
                            type='date'
                            {...checkIn}
                            // value={checkIn.value}
                            // onChange={(e) => checkIn.onchange(e)}
                        />
                    </div>
                </div>
                <div className='col m6'>
                    <div className='input-field' id='check-in'>
                        <div className='form-label'>Check-out</div>
                        <input
                            // className='browser-default'
                            type='date'
                            {...checkOut}
                            // value={checkOut.value}
                            // onChange={(e) => checkOut.onchange(e)}
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
                            {...guests}
                            // value={guests.value}
                            // onChange={(e) => guests.onchange(e)}
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

//CLASS VERSION
// class SearchBox extends Component {
//     state = {
//         where: "",
//         checkIn: "",
//         checkOut: "",
//         guests: 0
//     }

//     changeWhere = (e) => {
//         const newState = { ...this.state }
//         newState.where = e.target.value;

//         this.setState(newState)
//     }

//     changeCheckIn = (e) => {
//         const newState = { ...this.state }
//         newState.checkIn = e.target.value;

//         this.setState(newState)
//     }

//     changeCheckOut = (e) => {
//         const newState = { ...this.state }
//         newState.checkOut = e.target.value;

//         this.setState(newState)
//     }

//     changeGuests = (e) => {
//         const newState = { ...this.state }
//         newState.guests = e.target.value;

//         this.setState(newState)
//     }

//     submitSearch = (e) => {
//         e.preventDefault()
//         this.props.history.push(`/search/${this.state.where}`)
//     }


//     render() {
//         return (
//             <div className='home-search-box col m4'>
//                 <h1>Book unique places to stay and things to do</h1>
//                 <form onSubmit={this.submitSearch} className='search-box-form'>
//                     <div className='col m12'>
//                         <div className='input-field' id='where'>
//                             <div className='form-label'>Where</div>
//                             <input
//                                 // className='browser-default'
//                                 type='text'
//                                 placeholder='Anywhere'
//                                 value={this.state.where}
//                                 onChange={this.changeWhere}
//                             />
//                         </div>
//                     </div>
//                     <div className='col m6'>
//                         <div className='input-field' id='check-in'>
//                             <div className='form-label'>Check-in</div>
//                             <input
//                                 // className='browser-default'
//                                 type='date'
//                                 value={this.state.checkIn}
//                                 onChange={this.changeCheckIn}
//                             />
//                         </div>
//                     </div>
//                     <div className='col m6'>
//                         <div className='input-field' id='check-in'>
//                             <div className='form-label'>Check-out</div>
//                             <input
//                                 // className='browser-default'
//                                 type='date'
//                                 value={this.state.checkOut}
//                                 onChange={this.changeCheckOut}
//                             />
//                         </div>
//                     </div>
//                     <div className='col m12'>
//                         <div className='input-field' id='where'>
//                             <div className='form-label'>Guest</div>
//                             <input
//                                 // className='browser-default'
//                                 type='number'
//                                 placeholder='Number of Guests'
//                                 value={this.state.guests}
//                                 onChange={this.changeGuests}
//                             />
//                         </div>
//                     </div>
//                     <div className='col m12 submit-btn'>
//                         <div className='input-field' id='submit-btn'>
//                             <input
//                                 className='btn-large waves-effect waves-light red accent-2'
//                                 type='submit'
//                                 value='SUBMIT'
//                             />
//                         </div>
//                     </div>
//                 </form>
//             </div>
//         )
//     }
// }

export default SearchBox