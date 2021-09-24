import React from "react";
import City from "./City";
import Slider from "../Slider/Slider";

function Cities(props) {

    const { cities, header } = props
    const cityArr = cities.map((city, i) => {
        return (
            <div className='col s3' key={i}>
                <City city={city} />
            </div>
        )
    })
    return (
        <div className='cities-wrapper'>
            <h1 className='main-header-text'>{header}</h1>
            <Slider sliderContent={cityArr} />
        </div>
    )

}

export default Cities