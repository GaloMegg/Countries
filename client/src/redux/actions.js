const GET_COUNTRIES = 'GET_COUNTRIES';
const POST_ACTIVITY = 'POST_ACTIVITY';
const SORTED_COUNTRIES = 'SORTED_COUNTRIES'


function getCountries(x) {
    if (x) { return { type: GET_COUNTRIES, payload: x } }
    return async (dispatch) => {
        try {
            let req = await fetch('http://localhost:3001/countries')
            let countries = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: countries
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
function searchCountry(x) {
    return async (dispatch) => {
        try {
            let req = await fetch(`http://localhost:3001/countries?&name=${x}`)
            let country = await req.json()
            dispatch({
                type: GET_COUNTRIES,
                payload: country
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
                payload: country
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


module.exports = {
    getCountries,
    postActivity,
    searchCountry,
    sortedCountries,
    filteredCountry,
    GET_COUNTRIES,
    POST_ACTIVITY,
    SORTED_COUNTRIES
}