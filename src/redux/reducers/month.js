import { ERROR } from "../constants/base";
import { GET_ALL_MONTH } from "../constants/month";

const initState = {
    data: [],
    month: {},
    error: false,
    success: true
}
const monthReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_ALL_MONTH:
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }

        case ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}


export default monthReducers;