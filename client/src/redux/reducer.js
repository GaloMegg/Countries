import { SORTED_COUNTRIES, GET_COUNTRIES, POST_ACTIVITY } from './actions'
const initialState = {
    countries: [],
    activities: [],
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
        default: {
            return { ...state }
        }
    }
}

export default reducer;