import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCountries, filteredCountry, searchCountry, sortedCountries, countCountries, setCountriesPage, setPage, setLoading, getActivities } from "../../redux/actions"
const NavBar = () => {
    const [alphabeticalOrder, setAlphabeticalOrder] = useState(true)
    const [isOrderedAlph, setIsOrderedAlph] = useState(false)
    const [popOrder, setPopOrder] = useState(true)
    const [isOrderPop, setIsOrderPop] = useState(false)
    const [difOrder, setDifOrder] = useState(true)
    const [isOrderDif, setIsOrderDif] = useState(false)
    const disp = useDispatch()
    const { countries, count, countriesPerPage, contentType, pages, loading } = useSelector(state => state)
    const contentHandler = (e) => {
        if (e.target.value === "countries") {
            disp(getCountries())
        } else {

            disp(setPage(1))
            disp(getActivities())
        }
    }
    const searchBarHandler = (e) => {
        disp(setPage(1))
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
        let sortedArr = difOrder ? countries.sort((a, b) => {
            if (a.difficulty > b.difficulty) return -1
            if (a.difficulty < b.difficulty) return 1
            return 0
        }) : countries.sort((a, b) => {
            if (a.difficulty < b.difficulty) return -1
            if (a.difficulty > b.difficulty) return 1
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
    const setLoadingHandler = () => {
        disp(setLoading(true))

    }
    return (
        <nav className='nav'>

            <select name="" id="" className='countryActivities' onClick={contentHandler} onChange={setLoadingHandler}>
                <option value="countries">Countries</option>
                <option value="activities">Activities</option>
            </select>
            {contentType === "countries" && <input className='search' type="text" name="" id="" placeholder='&#128270; Buscar' onChange={searchBarHandler} />}
            {contentType === "countries" && <select className='continents' name="" id="" onClick={continentFilter} onChange={setLoadingHandler}>
                <option className='continent' value="all">All</option>
                <option className='continent' value="europe">Europe</option>
                <option className='continent' value="asia">Asia</option>
                <option className='continent' value="africa">Africa</option>
                <option className='continent' value="americas">Americas</option>
                <option className='continent' value="oceania">Oceania</option>
                <option className='continent' value="antarctic">Antarctic</option>
            </select>}
            {/* //!A-Z */}
            <button className='az' onClick={AZsort}>A-Z  {isOrderedAlph && <span>{alphabeticalOrder ? "ᐱ" : "ᐯ"}</span>}</button>


            {/* //!POP */}
            {contentType === "countries" ? <button className='pop' onClick={popSort}>Population  {isOrderPop && <span>{popOrder ? "ᐱ" : "ᐯ"}</span>}</button> : <button className='pop' onClick={difSort}>Difficulty{isOrderDif && <span>{difOrder ? "ᐱ" : "ᐯ"}</span>}</button>}

            {/* //!reset */}
            <button className='reset' onClick={resetHandler}>Reset</button>
            {/* //!nextPrev */}
            <div className='nextprev'>
                <div className='nextprev--shadow'>
                    {count > 1 && <button className='nextprev--prev' onClick={prevOnClick}>🠐</button>}
                </div>
                <div className='nextprev--shadow'>
                    {count < (countries.length / 10) && <button className='nextprev--next' onClick={nextOnClick}>🠒</button>}
                </div>
            </div>

            {pages > 1 && !loading && <p className='nextprev--currentPages'>{count}|{pages}</p>}
        </nav>
    )
}

export default NavBar