import React, { useEffect } from 'react'
import { getCountries } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CardMap from './CardMap'

const CardsContainer = () => {
    const dis = useDispatch()
    const { countries } = useSelector(state => state)
    useEffect(() => {
        dis(getCountries())
    }, [])
    return (
        <article className='cards'>
            <CardMap countries={countries} />
        </article>
    )
}

export default CardsContainer