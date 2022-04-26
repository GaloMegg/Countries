const GET_COUNTRIES = 'GET_COUNTRIES';
const POST_ACTIVITY = 'POST_ACTIVITY';


function getCountries() {
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
            let req = await fetch('http://localhost:3001/activities', {
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
            console.log(e)
        }
    }
}

module.exports = {
    getCountries,
    postActivity
}