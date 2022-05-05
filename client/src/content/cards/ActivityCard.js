import React from 'react'
import { Link } from 'react-router-dom'

const ActivityCard = ({ countries, difficulty, duration, name, season, id }) => {
    return (
        <Link to={`details/${id}`} className='card'>
            <p className='card__A-name'>Name: {name[0].toUpperCase() + name.slice(1)}</p>
            <p className='card__A-diff'>Difficulty: {difficulty}</p>
            <p className='card__A-duration'>Duration: {duration}</p>
            <p className='card__A-countries'>Countries: </p>
            <div className='card__A-img-flex'>
                {countries?.map((e) => <img className='card__A-img' src={e.img} key={e.id} />)}
            </div>
            <p className='card__A-season'>Season: {season[0].toUpperCase() + season.slice(1)}</p>
        </Link >
    )
}

export default ActivityCard