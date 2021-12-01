import { ERROR } from "../constants/base";
import { LOGIN, SIGNUP } from "../constants/login";

const initState = {
    data: {},
    error: false
}
const loginReducers = (state=initState, payload) => {
    switch (payload.type) {
        case LOGIN:
            return {
                ...state,
                data: payload.data,
                error: false
            }
        case SIGNUP:
            return {
                ...state,
                data: payload.data,
                error: false
            }
        case ERROR:
            return {
                ...state,
                data: {},
                error: true
            }
        default:
            return state;
    }
}


export default loginReducers;