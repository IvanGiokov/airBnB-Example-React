import React from "react";
import moment from 'moment'
import swal from "sweetalert";
import {
    REACT_APP_API_BASE_URL,
    POST_CANCEL_RESERVATION
} from '../../endpoints'
import axios from "axios";

function Bookings(props) {

    const { type, bookings, token } = props

    const cancelBooking = async (id, location) => {

        const cancelReservation = await swal({
            text: `Are you sure you want to cancel your trip to ${location}`,
            icon: 'warning',
            buttons: true
        })

        if(cancelReservation){
            const requestURL = `${REACT_APP_API_BASE_URL}/${POST_CANCEL_RESERVATION}`
            const requestData = {
                token: token,
                bid: id
            }

            const response = await axios.post(requestURL, requestData)

            if(response.data.msg === 'cancelled'){
                swal({
                    title: 'Cancelled',
                    icon: 'success'
                })
            }else {
                swal({
                    title: 'There was an error cancelling',
                    icon: 'error'
                })
            }
            
        }
    }

    const bookingsWrapper = bookings.map((booking, index) => {
        const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(booking.checkOut).format('MMM Do YYYY')}`

        return (
            <tr key={index} className="booking-row">
                {type === 'upcoming'?
                    <td>{booking.status}</td>
                    :
                    <td>complete</td>

                }
                <td>
                    <div className="booking-detail">{dates}</div>
                    <div className="booking-detail">{booking.venueData.title}</div>
                    <div className="booking-detail">{booking.venueData.location}</div>
                </td>
                <td>
                    <div className="booking-detail">Confirmation #: {booking.conf}</div>
                    <div className="booking-detail">{booking.numberOfGuests} Guests, {booking.totalNights} Nights</div>
                    <div className="booking-detail">${booking.pricePerNight} per night</div>
                    <div className="booking-detail">${booking.totalPrice} Total</div>
                </td>
                <td>
                    <div className="booking-detail pointer">
                        Print Reservation
                    </div>
                    {type === 'upcoming' && booking.status !=='cancelled' &&
                        <div onClick={() => cancelBooking(booking.id, booking.venueData.location)} className="booking-detail pointer">Cancel Confirmation</div>
                    }

                </td>
            </tr>
        )
    })
    return (
        <table className="booking">
            <thead>
                <tr>
                    <th>Status</th>
                    <th>Dates and location</th>
                    <th>Details</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookingsWrapper}
            </tbody>
        </table>
    )
}

export default Bookings;