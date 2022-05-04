import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActivityDetail from './ActivityDetail'
import CountryDetail from './CountryDetail'
const CountryDetailContainer = () => {
    const [loading, setLoading] = useState(true)
    const [country, setCountry] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetchingData(id)
        return () => {
            setCountry({})
            setLoading(true)
        }
    }, [id])
    console.log(country)
    async function fetchingData(id) {
        let url = id.length === 3 ? `http://localhost:3001/countries/${id}` : `http://localhost:3001/activity?id=${id}`
        let req = await fetch(url)
        let data = await req.json()
        setCountry(data)
        setLoading(false)
    }
    { return loading ? <h1>LOADING</h1> : <section>{id.length === 3 ? <CountryDetail {...country} /> : <ActivityDetail {...country} />}   </section> }
}

export default CountryDetailContainer