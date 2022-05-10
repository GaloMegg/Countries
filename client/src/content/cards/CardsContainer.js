import React, { useEffect, useState } from 'react'
import { getCountries, setCountPages } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'
import CardMap from './CardMap'
import Loader from '../Loader'

const CardsContainer = () => {
    const dis = useDispatch()
    const [loading, setLoading] = useState(true)
    const { countries, count, countriesPerPage, contentType, isFiltered } = useSelector(state => state)
    useEffect(() => {
        if (!isFiltered && contentType === "countries") {
            dis(getCountries())
        }
        setLoading(false)
        // (cantPaises-9)/10 + 1
    }, [dis, isFiltered, contentType])
    useEffect(() => {
        dis(setCountPages(Math.ceil(countries.length / 10)))
        // dis(setCountPages(Math.ceil(countries.length / countriesPerPage)))

    }, [countries, dis, countriesPerPage])

    const lastIndex = count * countriesPerPage
    const firstIndex = lastIndex - countriesPerPage
    const current = countries?.slice(firstIndex, lastIndex)
    return loading ? <Loader /> : < article className='cards' > <CardMap countries={current} contentType={contentType} /></article >

}

export default CardsContainer