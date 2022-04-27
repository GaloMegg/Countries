import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({ id, name, img, continent, activities }) => {
    console.log(...activities)
    return (
        <div className='card'>
            <img src={img} alt="" className='card__img' />
            <p className='card__title'>{name}, {id.toUpperCase()}</p>
            <p className='card__data'>{continent}</p>
            <div className='card__btn'>
                <Link to={`details/${id}`} >
                    <button className='card__btn-left' >Ver Mas</button>
                </Link>
            </div>
        </div>
    )
}

export default Card