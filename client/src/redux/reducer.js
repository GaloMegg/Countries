const initialState = {
    countries: [],
    activities: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload
            }
        case "POST_ACTIVITY":
            return {
                ...state,
                activities: [...state.activities, action.payload]
            }
        default: {
            return { ...state }
        }
    }
}

export default reducer;