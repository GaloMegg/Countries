const GET_COUNTRIES = 'GET_COUNTRIES';
const POST_ACTIVITY = 'POST_ACTIVITY';
const SORTED_COUNTRIES = 'SORTED_COUNTRIES';
const COUNT_COUNTRIES = 'COUNT_COUNTRIES';
const SET_COUNTRIES_PAGE = 'SET_COUNTRIES_PAGE'
const SET_PAGE = 'SET_PAGE'

function getCountries(x) {
    if (x) { return { type: GET_COUNTRIES, payload: x } }
    return async (dispatch) => {
        try {
            let req = await fetch('http://localhost:3001/countries')
            let countries = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: countries,
                contentType: "countries"
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}
function postActivity(x) {
    return async (dispatch) => {
        try {
            let req = await fetch('http://localhost:3001/activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(x)
            })
            let activity = await req.json()
            console.log(activity)
            dispatch({
                type: POST_ACTIVITY,
                payload: activity
            })
        }
        catch (e) {
            alert(e)
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
            let req = await fetch('http://localhost:3001/activity')
            let activities = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: activities,
                contentType: "activities"
            })
        }
        catch (e) { console.log(e) }
    }
}
function searchCountry(x) {
    return async (dispatch) => {
        try {
            let req = await fetch(`http://localhost:3001/countries?&name=${x}`)
            let country = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: country,
                contentType: "countries"
            })
        }
        catch (e) {
            console.log(e)
        }
    }
}
function filteredCountry(x) {
    return async dispatch => {
        try {
            let req = await fetch(`http://localhost:3001/countries/filter/${x}`)
            let country = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: country,
                contentType: "countries"
            })
        }
        catch (e) { console.log(e) }
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
    GET_COUNTRIES,
    POST_ACTIVITY,
    SORTED_COUNTRIES,
    COUNT_COUNTRIES,
    SET_PAGE,
    SET_COUNTRIES_PAGE
}