import React from "react";
import Venue from "./Venue";

function Venues(props) {
    const { venues, header } = props

    const venuesElements = venues.map((venue, index) => {
        return (
            <div className='col s3' key={index}>
                <Venue venue={venue} />
            </div>
        )
    })

    return (
        <div className='venues-wrapper'>
            <h1 className='main-header-text'>{header}</h1>
            {venuesElements}
        </div>
    )
}

export default Venues;