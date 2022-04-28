import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import CountryDetail from './CountryDetail'
const CountryDetailContainer = () => {
    const [country, setCountry] = useState({})
    const { id } = useParams()
    useEffect(() => {
        fetchingData(id)
        return () => {
            setCountry({})
        }
    }, [id])
    async function fetchingData(id) {
        let req = await fetch(`http://localhost:3001/countries/${id}`)
        let data = await req.json()
        setCountry(data)
    }
    return (
        <section>
            <CountryDetail {...country} />
        </section>
    )
}

export default CountryDetailContainer