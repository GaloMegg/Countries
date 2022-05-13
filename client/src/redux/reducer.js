import { SORTED_COUNTRIES, GET_COUNTRIES, SET_COUNT_PAGES, POST_ACTIVITY, COUNT_COUNTRIES, SET_COUNTRIES_PAGE, SET_LOADING, SET_PAGE, INTERNAL_ERROR } from './actions'


const initialState = {
    countries: [],
    activity: {},
    internalError: false,
    isFiltered: false,
    loading: true,
    contentType: 'countries',
    count: 1,
    countriesPerPage: 9,
    pages: 0
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                contentType: action.contentType,
                isFiltered: action.isFiltered,
                loading: action.loading
            }
        case POST_ACTIVITY:
            return {
                ...state,
                activity: action.payload
            }
        case SORTED_COUNTRIES:
            return {
                ...state,
                countries: action.payload,
                isFiltered: action.isFiltered,


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
        case SET_COUNT_PAGES:
            return {
                ...state,
                pages: action.payload
            }
        case INTERNAL_ERROR:
            return {
                ...state,
                internalError: action.payload
            }
        case SET_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default: {
            return { ...state }
        }
    }
}

export default reducer;