import React from 'react'

const ActivityDetail = ({ difficulty, duration, name, season, countries }) => {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Difficulty: {difficulty}</p>
            <p>Duration: {duration}</p>
            <p>Season: {season}</p>
        </div>
    )
}

export default ActivityDetail