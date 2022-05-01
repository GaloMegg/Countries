import { SORTED_COUNTRIES, GET_COUNTRIES, POST_ACTIVITY, COUNT_COUNTRIES, SET_COUNTRIES_PAGE, SET_PAGE } from './actions'
const initialState = {
    countries: [],
    activities: [],
    count: 1,
    countriesPerPage: 9,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case POST_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        case SORTED_COUNTRIES:
            return {
                ...state,
                countries: action.payload
            }
        case COUNT_COUNTRIES:
            return {
                ...state,
                count: action.payload ? state.count + 1 : state.count - 1
            }
        case SET_PAGE:
            return {
                ...state,
                count: action.payload
            }
        case SET_COUNTRIES_PAGE:
            return {
                ...state,
                countriesPerPage: action.payload
            }
        default: {
            return { ...state }
        }
    }
}

export default reducer;