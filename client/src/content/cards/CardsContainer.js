import React, { useEffect, useState } from 'react'
import { getCountries } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CardMap from './CardMap'

const CardsContainer = () => {
    const dis = useDispatch()
    const [loading, setLoading] = useState(true)
    const { countries, count, countriesPerPage } = useSelector(state => state)
    useEffect(() => {
        dis(getCountries())
        setLoading(false)
    }, [])
    const lastIndex = count * countriesPerPage
    const firstIndex = lastIndex - countriesPerPage
    const currentpost = countries?.slice(firstIndex, lastIndex)

    {
        return loading ? <h1>Loading</h1> : < article className='cards' > <CardMap countries={currentpost} /></article >
    }

}

export default CardsContainer