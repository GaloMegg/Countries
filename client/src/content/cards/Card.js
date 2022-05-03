import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, name, img, continent }) => {
    return (
        <Link to={`details/${id}`} className='card'>
            <img src={img} alt="" className='card__img' />
            <p className='card__title'>{name}, {id.toUpperCase()}</p>
            <p className='card__data'>{continent}</p>
        </Link >
    )
}

export default Card