import React from 'react'

const CountryDetail = ({ name, img, id, capital, continent, subregion, area, population, activities }) => {
    return (
        <>
            <div className='country__Detail'>
                <div className='country__Detail--img-flex'>
                    <img className='country__Detail--img' src={img} alt="" loading='lazy' />
                    <div className='country__Detail--flex'>
                        <h1 className='country__Detail--name'>{name}, {id}</h1>
                        <p className='country__Detail--capital'>Capital: {capital}</p>
                        <p className='country__Detail--continent'>Continent: {continent}</p>
                        <p className='country__Detail--sub'>Sub-Region: {subregion}</p>
                        <p className='country__Detail--pop'>Population: {population}</p>
                        <p className='country__Detail--area'>Area: {area} m²</p>

                        <a href={`https://www.google.com/maps/search/?api=1&query=${name}`} target="_blank" rel="noopener noreferrer">Maps</a>
                    </div>

                </div>
                {activities.length > 0 && <div className='country__Detail--activities'>
                    <h1>Activities: </h1>
                    {activities?.map(e => <div className='country__Detail--activities-try' key={e.id}>
                        <p>{e.name}</p>
                        <p>{e.season}</p>
                    </div>)}
                </div>}
            </div>
        </>
    )
}

export default CountryDetail