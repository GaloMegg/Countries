import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filteredCountry, searchCountry, sortedCountries, countCountries, setCountriesPage, setPage, getActivities } from "../../redux/actions"
const NavBar = () => {
    const [alphabeticalOrder, setAlphabeticalOrder] = useState(true)
    const [isOrderedAlph, setIsOrderedAlph] = useState(false)
    const [popOrder, setPopOrder] = useState(true)
    const [isOrderPop, setIsOrderPop] = useState(false)
    const [difOrder, setDifOrder] = useState(true)
    const [isOrderDif, setIsOrderDif] = useState(false)
    const disp = useDispatch()
    const { countries, count, countriesPerPage, contentType } = useSelector(state => state)
    const contentHandler = (e) => {
        if (e.target.value === "countries") {
            disp(getCountries())
        } else {
            disp(setPage(1))
            disp(getActivities())
        }
    }
    const searchBarHandler = (e) => {
        disp(searchCountry(e.target.value))
    }

    const AZsort = () => {
        setIsOrderPop(false)
        setIsOrderDif(false)
        let sortedArr = alphabeticalOrder ? countries.sort((a, b) => {
            if (a.name < b.name) return -1
            if (a.name > b.name) return 1
            return 0
        }) : countries.sort((a, b) => {
            if (a.name > b.name) return -1
            if (a.name < b.name) return 1
            return 0
        })
        disp(sortedCountries(sortedArr))
        setAlphabeticalOrder(!alphabeticalOrder)
        setIsOrderedAlph(true)
    }
    const continentFilter = (e) => {
        disp(setPage(1))
        if (e.target.value === "all") {
            disp(getCountries())
            return
        }
        disp(filteredCountry(e.target.value))
    }
    const popSort = () => {
        setIsOrderedAlph(false)
        setIsOrderDif(false)
        let sortedArr = popOrder ? countries.sort((a, b) => {
            if (a.population < b.population) return -1
            if (a.population > b.population) return 1
            return 0
        }) : countries.sort((a, b) => {
            if (a.population > b.population) return -1
            if (a.population < b.population) return 1
            return 0
        })
        disp(sortedCountries(sortedArr))
        setPopOrder(!popOrder)
        setIsOrderPop(true)
    }
    const difSort = () => {
        setIsOrderedAlph(false)
        setIsOrderPop(false)
        let sortedArr = popOrder ? countries.sort((a, b) => {
            if (a.difficulty < b.difficulty) return -1
            if (a.difficulty > b.difficulty) return 1
            return 0
        }) : countries.sort((a, b) => {
            if (a.difficulty > b.difficulty) return -1
            if (a.difficulty < b.difficulty) return 1
            return 0
        })
        disp(sortedCountries(sortedArr))
        setDifOrder(!difOrder)
        setIsOrderDif(true)
    }
    const resetHandler = () => {
        if (contentType === "countries") {
            disp(getCountries())
        } else {
            disp(getActivities())
        }
        setIsOrderedAlph(false)
        setIsOrderPop(false)
        setIsOrderDif(false)
        disp(setPage(1))
    }
    const prevOnClick = () => {
        if (count === 2) disp(setCountriesPage(9))
        disp(countCountries(false))
    }
    const nextOnClick = () => {
        if (countriesPerPage !== 10) disp(setCountriesPage(10))
        disp(countCountries(true))
    }
    return (
        <nav className='nav'>
            <select name="" id="" onClick={contentHandler}>
                <option value="countries">Countries</option>
                <option value="activities">Activities</option>
            </select>
            {contentType === "countries" && <input type="text" name="" id="" placeholder='&#128270; Buscar' onChange={searchBarHandler} />}
            {contentType === "countries" && <select name="" id="" onChange={continentFilter}>
                <option value="all">All</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="oceania">Oceania</option>
                <option value="antarctic">Antarctic</option>
            </select>}
            <button onClick={AZsort}>A-Z  {isOrderedAlph && <span>{alphabeticalOrder ? "ᐱ" : "ᐯ"}</span>}</button>
            {contentType === "countries" ? <button onClick={popSort}>Population  {isOrderPop && <span>{popOrder ? "ᐱ" : "ᐯ"}</span>}</button> : <button onClick={difSort}>Dificulty  {isOrderDif && <span>{difOrder ? "ᐱ" : "ᐯ"}</span>}</button>}
            <button onClick={resetHandler}>Reset</button>

            {count > 1 && <button onClick={prevOnClick}>prev</button>}
            {count < (countries.length / 10) && <button onClick={nextOnClick}>next</button>}

        </nav>
    )
}

export default NavBar