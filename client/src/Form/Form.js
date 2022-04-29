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

    const [countryError, setCountryError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [dificultyError, setDificultyError] = useState(false)
    const [seasonError, setSeasonError] = useState(false)
    const [durationError, setDurationError] = useState(false)
    //TODO\p{L}

    //!OnSubmit
    const submitForm = (e) => {
        e.preventDefault()
        if (formInfo.countries.length === 0) { setCountryError(true) }
        if (!formInfo.name || formInfo.name?.length > 255 || formInfo.name?.length === 0 || !formInfo.name.match(/^[A-Za-z]+$/)) { setNameError(true) }
        if (formInfo.dificulty < 0 || formInfo.dificulty > 5) { setDificultyError(true) }
        if (!formInfo.season) { setSeasonError(true) }
        if (!formInfo.duration) { setDurationError(true) }
        if (formInfo.countries.length > 0 && formInfo.name.length <= 255 && formInfo.name.match(/^[A-Za-z]+$/) && (formInfo.dificulty >= 0 && formInfo.dificulty <= 5) && formInfo.season && formInfo.duration) {
            console.log("creada")
            dispatch(postActivity(formInfo))
        }
        return
    }
    //*General
    const handleChanges = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: isNaN(e.target.value) ? e.target.value : parseInt(e.target.value)
        })
    }
    //!Name
    const handleNameKey = (e) => {
        setNameError(false)
        if (e.target.value.length > 255) { e.preventDefault() }
    }
    //!Duration
    function durationHandler(e) {
        setDurationError(false)
        if (isNaN(e.key) && e.key !== "Backspace") e.preventDefault()
    }
    //!Dificulty
    function dificultyVal(e) {
        setDificultyError(false)
        if (e.target.value.length >= 1 && e.key !== "Backspace") {
            e.preventDefault()
        }
        if ((isNaN(e.key) && e.key !== "Backspace") || e.key > 5 || e.key < 1) e.preventDefault()
    }
    //!Countries
    const countriesClick = () => { setCountrySelect(false) }
    const countriesHandler = (e) => {
        setCountrySelect(false)
        setCountryError(false)
        let val = e.target.value
        if (e.target.value === "" || !e.target.value) { return }
        let count = countries.find(e => e.name === val)
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
        setSeasonError(false)
        if (e.target.value === "") { return }
        setFormInfo({
            ...formInfo,
            season: e.target.value
        })
    }
    //!Verification Of countries
    countries.length > 0 || dispatch(getCountries())
    return (
        <form className='' onSubmit={submitForm}>
            {nameError && <p className='error'>The name cannot be empty and has a limit of 255 characters</p>}
            <input type="text" placeholder='Name' name="name" className={nameError ? "inputError" : "input"} onChange={handleChanges} onKeyDown={handleNameKey} onBlur={handleChanges} />
            {durationError && <p className='error'>The duration cannot be empty</p>}
            <input type="text" placeholder='Duration' name="duration" className='' onKeyDown={durationHandler} onChange={handleChanges} onBlur={handleChanges} />
            {dificultyError && <p className='error'>The dificulty must be a number between 1 and 5</p>}
            <input type="text" placeholder='Dificulty' name='dificulty' className='' onKeyDown={dificultyVal} onChange={handleChanges} onBlur={handleChanges} />
            {seasonError && <p className='error'>The activity must have a season</p>}
            <select name="season" id="season" onChange={seasonSelectHandler} onBlur={seasonSelectHandler} onClick={seasonSelectHandler}>
                {seasonSelect && <option value="">Season</option>}
                <option value="spring">Spring</option>
                <option value="summer">Summer</option>
                <option value="autumn">Autumn</option>
                <option value="winter">Winter</option>
            </select>
            {countryError && <p className='error'>The activity must have, at least, one country</p>}
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
                    let filteredCountry = countries.find(a => a.id === e)
                    return (
                        <div key={e}>
                            <p >{e.toUpperCase()}({filteredCountry?.name})</p>
                            <button value={e} onClick={deleteCountry}>X</button>
                        </div>)
                })}
            </div>
            <button type="submit" disabled={false} style={{ "width": "100px", "height": "5vh" }}></button>
        </form >
    )
}

export default Form