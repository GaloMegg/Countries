import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, searchCountry, sortedCountries } from "../../redux/actions"
const NavBar = () => {
    const [alphabeticalOrder, setAlphabeticalOrder] = useState(true)
    const [isOrderedAlph, setIsOrderedAlph] = useState(false)
    const [popOrder, setPopOrder] = useState(true)
    const [isOrderPop, setIsOrderPop] = useState(false)

    const disp = useDispatch()
    const { countries } = useSelector(state => state)
    const searchBarHandler = (e) => {
        disp(searchCountry(e.target.value))
    }
    const AZsort = () => {
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
        if (e.target.value === "all") {
            disp(getCountries())
        }
        let filteredCountries = countries.filter(country => country.continent === e.target.value)
        disp(sortedCountries(filteredCountries))
    }

    const popSort = () => {
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
    const resetHandler = () => {
        disp(getCountries())
        setIsOrderedAlph(false)
    }
    return (
        <nav className='nav'>
            <input type="text" name="" id="" placeholder='&#128270; Buscar' onChange={searchBarHandler} />
            <select name="" id="" onChange={continentFilter}>
                <option value="all">All</option>
                <option value="europe">Europe</option>
                <option value="asia">Asia</option>
                <option value="africa">Africa</option>
                <option value="americas">Americas</option>
                <option value="oceania">Oceania</option>
                <option value="antarctic">Antarctic</option>
            </select>
            <button onClick={AZsort}>A-Z  {isOrderedAlph && <span>{alphabeticalOrder ? "ᐱ" : "ᐯ"}</span>}</button>

            <button onClick={popSort}>Population  {isOrderPop && <span>{popOrder ? "ᐱ" : "ᐯ"}</span>}</button>

            <button onClick={resetHandler}>Reset</button>

        </nav>
    )
}

export default NavBar