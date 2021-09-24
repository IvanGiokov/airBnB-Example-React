import React, { Component } from 'react';
import './Activity.css'
import Activity from './Activity';

class Activities extends Component {
    render() {
        const activities = this.props.activities.map((activity, i) => {
            return (
                <div className='col s3' key={i}>
                    <Activity activity={activity} />
                </div>
            )
        })

        return (
            <div className='activity'>
                {activities}
            </div>
        )
    }
}

export default Activities