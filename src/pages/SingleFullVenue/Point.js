import React from "react";

function Point(props) {

    const foundDesc = props.pointsDescrption.find((point) => point.pointTitle === props.point)

    return (
        <div>
            <div className='point-title'>
                <div>{props.point}</div>
            </div>
            <div className='point-description'>{foundDesc.text}</div>
        </div>
    )
}

export default Point