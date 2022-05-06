import React from 'react'
import { Link } from 'react-router-dom'
const ActivityDetail = ({ difficulty, duration, name, season, countries }) => {

    return (
        <>
            <article className='activity__details'>
                <div className='activity__details--info'>
                    <p>Name: {name}</p>
                    <p>Difficulty: {difficulty}</p>
                    <p>Duration: {duration}</p>
                    <p>Season:{season} </p>
                </div>
                <div className='activity__images'>
                    {countries?.map(e => <Link to={`/home/details/${e.id}`} className='activity__images--link'>
                        <img src={e.img} key={e.id} className='activity__images--try' />
                    </Link>
                    )}
                </div>
            </article>
        </>
    )
}

export default ActivityDetail