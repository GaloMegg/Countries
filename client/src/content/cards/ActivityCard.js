import React from 'react'
import { Link } from 'react-router-dom'

const ActivityCard = ({ countries, difficulty, duration, name, season, id }) => {
    return (
        <Link to={`details/${id}`} className='card'>
            <p className='card__title'>Name: {name}</p>
            <p className='card__title'>Difficulty: {difficulty}</p>
            <p className='card__title'>Duration: {duration}</p>
            <p className='card__title'>Countries: </p>
            {countries?.map((e) => <p className='card__title' key={e.id}>{e.name}</p>)}
            <p className='card__data'>Season: {season}</p>
        </Link >
    )
}

export default ActivityCard