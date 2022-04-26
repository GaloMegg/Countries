import React from 'react'

const Card = ({ id, name, img, continent }) => {
    return (
        <div className='card'>
            <img src={img} alt="" className='card__img' />
            <p className='card__title'>{name}, {id.toUpperCase()}</p>
            <p className='card__data'>{continent}</p>
            <div className='card__btn'>
                <button className='card__btn-left'>Ver Mas</button>
            </div>
        </div>
    )
}

export default Card