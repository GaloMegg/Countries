import React from 'react'

const ActivityDetail = ({ dificulty, duration, name, season, countries }) => {
    return (
        <div>
            <p>Name: {name}</p>
            <p>Dificulty: {dificulty}</p>
            <p>Duration: {duration}</p>
            <p>Season: {season}</p>
        </div>
    )
}

export default ActivityDetail