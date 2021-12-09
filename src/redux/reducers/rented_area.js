import { ERROR } from "../constants/base";
import { GET_THE_REST_AREA } from "../constants/floor";
import { DELETE, GET_ALL, POST, UPDATE, REGISTER_CONTRACT } from "../constants/rented_area";

const initState = {
    data: [],
    rentedArea: {},
    error: false,
    success: true,
    restArea: 0,
}
const rentedAreaReducers = (state = initState, payload) => {
    switch (payload.type) {
        case GET_ALL:
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case GET_THE_REST_AREA:
            return {
                ...state,
                restArea: payload.data,
                success: true,
                error: false
            }
        case REGISTER_CONTRACT:
            return {
                ...state,
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




export default rentedAreaReducers;