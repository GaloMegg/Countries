import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { postActivity, getCountries, postClean } from '../redux/actions'
const Form = () => {
    const [seasonSelect, setSeasonSelect] = useState(true)
    const [countrySelect, setCountrySelect] = useState(true)
    const [formInfo, setFormInfo] = useState({
        countries: []
    })
    const dispatch = useDispatch()
    const { countries, activity } = useSelector(state => state)
    const [crated, setCrated] = useState(false)
    const [countryError, setCountryError] = useState(false)
    const [nameError, setNameError] = useState(false)
    const [difficultyError, setDifficultyError] = useState(false)
    const [seasonError, setSeasonError] = useState(false)
    const [durationError, setDurationError] = useState(false)
    //TODO CleanUp
    console.log(activity)
    useEffect(() => {
        return () => {
            setCrated(false)
            dispatch(postClean())
        }
    }, [])
    //!OnSubmit
    const submitForm = (e) => {
        e.preventDefault()
        if (formInfo.countries.length === 0) { setCountryError(true) }
        if (!formInfo.name || formInfo.name?.length > 255 || formInfo.name?.length === 0 || !formInfo.name.match(/^[A-Za-z]+$/)) { setNameError(true) }
        if (formInfo.difficulty < 0 || formInfo.difficulty > 5) { setDifficultyError(true) }
        if (!formInfo.season) { setSeasonError(true) }
        if (!formInfo.duration) { setDurationError(true) }
        if (formInfo.countries.length > 0 && formInfo.name.length <= 255 && formInfo.name.match(/^[A-Za-z]+$/) && (formInfo.difficulty >= 0 && formInfo.difficulty <= 5) && formInfo.season && formInfo.duration) {
            let form = document.form
            console.log("creada")
            dispatch(postActivity(formInfo))
            form.reset()
            setSeasonSelect(true)
            setCountrySelect(true)

            setCrated(true)
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
        if (!isNaN(Number(e.key)) && e.key !== "Backspace") { e.preventDefault() }
        if (e.target.value.length > 255) { e.preventDefault() }
    }
    //!Duration
    function durationHandler(e) {
        setDurationError(false)
        if (isNaN(e.key) && e.key !== "Backspace") e.preventDefault()
    }
    //!difficulty
    function difficultyVal(e) {
        setDifficultyError(false)
        if (e.target.value.length >= 1 && e.key !== "Backspace") {
            e.preventDefault()
        }
        if ((isNaN(e.key) && e.key !== "Backspace") || e.key > 5 || e.key < 1) e.preventDefault()
    }
    //!Countries
    const countriesClick = () => {
        dispatch(getCountries())
        setCountrySelect(false)
    }
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
        <form className='form' name='form' onSubmit={submitForm}>
            {nameError && <p className='error'>The name cannot be empty and has a limit of 255 characters</p>}
            <input type="text" placeholder='Name' name="name" className={nameError ? "inputError" : "input"} onChange={handleChanges} onKeyDown={handleNameKey} onBlur={handleChanges} />
            {durationError && <p className='error'>The duration cannot be empty</p>}
            <input type="text" placeholder='Duration' name="duration" className='' onKeyDown={durationHandler} onChange={handleChanges} onBlur={handleChanges} />
            {difficultyError && <p className='error'>The difficulty must be a number between 1 and 5</p>}
            <input type="text" placeholder='difficulty' name='difficulty' className='' onKeyDown={difficultyVal} onChange={handleChanges} onBlur={handleChanges} />
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
            <button type="submit" disabled={false}> Create</button>
            {crated && <><h2> Activity Created</h2> <Link to={`/home/details/${activity.id}`}> Link to the Activity</ Link> </>}
        </form >
    )
}

export default Form