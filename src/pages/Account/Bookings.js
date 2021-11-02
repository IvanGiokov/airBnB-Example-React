import React from "react";
import moment from 'moment'

function Bookings(props) {
    const { type, bookings } = props
    const bookingsWrapper = bookings.map((booking, index) => {
        const dates = `${moment(booking.checkIn).format('MMM Do')} - ${moment(booking.checkOut).format('MMM Do YYYY')}`
        return (
            <tr key={index} className="booking-row">
                {type === 'upcoming' ?
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
                    {type === 'upcoming' &&
                        <div className="booking-detail pointer">Cancel Confirmation</div>
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