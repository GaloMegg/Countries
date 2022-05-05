import React from 'react'
import { Link } from 'react-router-dom'
const CountryDetail = ({ name, img, id, capital, continent, subregion, area, population, activities }) => {
    return (
        <>
            <div className='country__Detail'>
                <div className='country__Detail--img-flex'>
                    <img className='country__Detail--img' src={img} alt="" loading='lazy' />
                    <div className='country__Detail--flex'>
                        <h2 className='country__Detail--name'>{name}, {id}</h2>
                        <p className='country__Detail--capital'>Capital: {capital}</p>
                        <p className='country__Detail--continent'>Continent: {continent}</p>
                        <p className='country__Detail--sub'>Sub-Region: {subregion}</p>
                        <p className='country__Detail--pop'>Population: {population}</p>
                        <p className='country__Detail--area'>Area: {area} m²</p>

                        <a href={`https://www.google.com/maps/search/?api=1&query=${name}`} target="_blank" rel="noopener noreferrer" className='link__maps'>
                            <button className='btn__maps'>
                                Maps
                            </button>
                        </a>
                    </div>

                </div>
                {activities?.length > 0 && <div className='country__Detail--activities'>
                    <h2 className='country__Detail--title'>Activities: </h2>
                    <div className='country__Detail--activities-try' >
                        <p className='TH'>Names</p>
                        <p className='TH'>Difficulties</p>
                        <p className='TH'>Season</p>
                        <p className='TH'>Duration</p>

                        <p className='TH'>Link to Activities</p>
                    </div>
                    {activities?.map(e => <div className='country__Detail--activities-try' key={e.id}>
                        <p>{e.name[0].toUpperCase() + e.name.slice(1)}</p>
                        <p>{e.difficulty}</p>
                        <p>{e.season[0].toUpperCase() + e.season.slice(1)}</p>
                        <p>{e.duration}</p>
                        <Link to={`/home/details/${e.id}`}> Go to details</Link>
                    </div>)}
                </div>}
            </div>
        </>
    )
}

export default CountryDetail