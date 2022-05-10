const GET_COUNTRIES = 'GET_COUNTRIES';
const POST_ACTIVITY = 'POST_ACTIVITY';
const SORTED_COUNTRIES = 'SORTED_COUNTRIES';
const COUNT_COUNTRIES = 'COUNT_COUNTRIES';
const SET_COUNTRIES_PAGE = 'SET_COUNTRIES_PAGE'
const SET_PAGE = 'SET_PAGE'
const SET_COUNT_PAGES = 'SET_COUNT_PAGES';
const INTERNAL_ERROR = 'INTERNAL_ERROR'

function getCountries(x) {
    if (x) { return { type: GET_COUNTRIES, payload: x } }
    return async (dispatch) => {
        try {
            let req = await fetch(`${process.env.REACT_APP_EXPRESS}countries`)
            let countries = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: countries,
                contentType: "countries",
                isFiltered: false
            })
        }
        catch (e) {
            dispatch({ type: INTERNAL_ERROR, payload: true })
        }
    }
}
function postActivity(x) {
    return async (dispatch) => {
        try {
            let req = await fetch(`${process.env.REACT_APP_EXPRESS}activity`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(x)
            })
            let activity = await req.json()
            dispatch({
                type: POST_ACTIVITY,
                payload: activity
            })
        }
        catch (e) {
            dispatch({ type: INTERNAL_ERROR, payload: true })

        }
    }
}
function postClean() {
    return {
        type: POST_ACTIVITY,
        payload: {}
    }
}
function getActivities() {
    return async dispatch => {
        try {
            let req = await fetch(`${process.env.REACT_APP_EXPRESS}activity`)
            let activities = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: activities,
                contentType: "activities"
            })
        }
        catch (e) {
            dispatch({ type: INTERNAL_ERROR, payload: true })

        }
    }
}
function searchCountry(x) {
    return async (dispatch) => {
        try {
            let req = await fetch(`${process.env.REACT_APP_EXPRESS}countries?&name=${x}`)
            let country = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: country,
                contentType: "countries",
                isFiltered: true
            })
        }
        catch (e) {
            dispatch({ type: INTERNAL_ERROR, payload: true })

        }
    }
}
function filteredCountry(x) {
    return async dispatch => {
        try {
            let req = await fetch(`${process.env.REACT_APP_EXPRESS}countries/filter/${x}`)
            let country = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: country,
                contentType: "countries",
                isFiltered: true
            })
        }
        catch (e) {
            dispatch({ type: INTERNAL_ERROR, payload: true })

        }
    }
}
function sortedCountries(x) {
    return {
        type: SORTED_COUNTRIES,
        payload: x
    }
}
function countCountries(boolean) {
    return {
        type: COUNT_COUNTRIES,
        payload: boolean
    }
}
function setCountriesPage(x) {
    return {
        type: SET_COUNTRIES_PAGE,
        payload: x
    }
}
function setPage(x) {
    return {
        type: SET_PAGE,
        payload: x
    }
}
function setCountPages(x) {
    return {
        type: SET_COUNT_PAGES,
        payload: x
    }
}
module.exports = {
    getCountries,
    postActivity,
    searchCountry,
    sortedCountries,
    filteredCountry,
    countCountries,
    setPage,
    postClean,
    getActivities,
    setCountriesPage,
    setCountPages,
    GET_COUNTRIES,
    POST_ACTIVITY,
    SET_COUNT_PAGES,
    SORTED_COUNTRIES,
    COUNT_COUNTRIES,
    SET_PAGE,
    SET_COUNTRIES_PAGE,
    INTERNAL_ERROR
}