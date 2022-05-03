import React from 'react'

const CountryDetail = ({ name, img, id, capital, continent, subregion, area, population, activities }) => {
    return (
        <div>
            <img src={img} alt="" loading='lazy' />
            <h1>                {name}            </h1>
            <p>                {id}            </p>
            <p>Capital: {capital}</p>
            <p>Continent: {continent}</p>
            <p>Sub-Region: {subregion}</p>
            <p>Population: {population}</p>
            <p>Area: {area} m²</p>

            {activities?.map(e => <>
                <h1>Acctivities: </h1>
                <p>{e.name}</p>
                <p>{e.season}</p>
            </>
            )
            }
        </div>
    )
}

export default CountryDetail