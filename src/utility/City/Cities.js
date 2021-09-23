import React from "react";
import City from "./City";
import Slider from "../Slider/Slider";

function Cities(props) {
    const cities = props.cities.map((city, i) => {
        return (
            <div className='col s3'>
                <City city={city} key={i} />
            </div>
        )
    })
    return (
        <Slider sliderContent={cities} />
    )

}

export default Cities