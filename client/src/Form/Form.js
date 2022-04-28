import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActivity, getCountries } from '../redux/actions'
const Form = () => {
    const [seasonSelect, setSeasonSelect] = useState(true)
    const [countrySelect, setCountrySelect] = useState(true)
    const [formInfo, setFormInfo] = useState({
        countries: []
    })
    const dispatch = useDispatch()
    const { countries } = useSelector(state => state)
    //!OnSubmit
    const submitForm = (e) => {
        e.preventDefault()
        if (formInfo.name && (formInfo.duration) && (formInfo.dificulty > 1 && formInfo.dificulty < 5) && formInfo.date && formInfo.time) {
            dispatch(postActivity(formInfo))
        }
    }
    //*General
    const handleChanges = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }
    //!Name
    const handleNameKey = (e) => {
        if (e.target.value.length > 255) { e.preventDefault() }
    }
    //!Duration
    function durationHandler(e) {
        if (isNaN(e.key) && e.key !== "Backspace") e.preventDefault()
    }
    //!Dificulty
    function dificultyVal(e) {
        if (e.target.value.length >= 1 && e.key !== "Backspace") {
            e.preventDefault()
        }
        if ((isNaN(e.key) && e.key !== "Backspace") || e.key > 5 || e.key < 1) e.preventDefault()
    }
    //!Countries
    const countriesClick = (e) => { setCountrySelect(false) }
    const countriesHandler = (e) => {
        setCountrySelect(false)
        let val = e.target.value
        if (e.target.value == "" || !e.target.value) { return }
        let count = countries.find(e => e.name == val)
        if (formInfo.countries.includes(count.id)) { return }
        setFormInfo({
            ...formInfo,
            countries: [...formInfo.countries, count.id]
        })
    }
    function deleteCountry(e) {
        setFormInfo({
            ...formInfo,
            countries: formInfo.countries.filter(country => country !== e.target.value)
        })
    }
    //!Season
    const seasonSelectHandler = (e) => {
        setSeasonSelect(false)
        if (e.target.value == "") { return }
        setFormInfo({
            ...formInfo,
            season: e.target.value
        })
    }
    //!Verification Of countries
    countries.length > 0 || dispatch(getCountries())
    return (
        <form className='' onSubmit={submitForm}>
            <input type="text" placeholder='Name' name="name" className='' onChange={handleChanges} onKeyDown={handleNameKey} onBlur={handleChanges} />
            <input type="text" placeholder='Duration' name="duration" className='' onKeyDown={durationHandler} onChange={handleChanges} onBlur={handleChanges} />
            <input type="text" placeholder='Dificulty' name='dificulty' className='' onKeyDown={dificultyVal} onChange={handleChanges} onBlur={handleChanges} />
            <select name="season" id="season" onChange={seasonSelectHandler} onBlur={seasonSelectHandler} onClick={seasonSelectHandler}>
                {seasonSelect && <option value="">Season</option>}
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
            </select>
            <select name="countries" id="" onChange={countriesHandler} onBlur={countriesHandler} onClick={countriesClick}>
                {countrySelect && <option value="">Select Country</option>}
                {countries?.sort((a, b) => {
                    if (a.name < b.name) return -1
                    if (a.name > b.name) return 1
                    return 0
                }).map(e => { return <option key={e.id}>{e.name}</option> })}
            </select>
            <div>
                {formInfo.countries.map(e => {
                    let filteredCountry = countries.find(a => a.id == e)
                    return (
                        <div key={e}>
                            <p >{e.toUpperCase()}</p>
                            <p >({filteredCountry?.name})</p>
                            <button value={e} onClick={deleteCountry}>X</button>
                        </div>)
                })}
            </div>
            <button type="submit" disabled={false} style={{ "width": "100px", "height": "5vh" }}></button>
        </form >
    )
}

export default Form