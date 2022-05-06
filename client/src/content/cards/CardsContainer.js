import React, { useEffect, useState } from 'react'
import { getCountries } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CardMap from './CardMap'
import Loader from '../Loader'

const CardsContainer = () => {
    const dis = useDispatch()
    const [loading, setLoading] = useState(true)
    const { countries, count, countriesPerPage, contentType } = useSelector(state => state)
    useEffect(() => {
        dis(getCountries())
        setLoading(false)
    }, [])
    const lastIndex = count * countriesPerPage
    const firstIndex = lastIndex - countriesPerPage
    const current = countries?.slice(firstIndex, lastIndex)
    { return loading ? <Loader /> : < article className='cards' > <CardMap countries={current} contentType={contentType} /></article > }

}

export default CardsContainer