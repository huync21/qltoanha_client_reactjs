import { ERROR } from "../constants/base";
import { GET_ALL, DELETE, PUSH_COMPANY_TO_REDUX, GET_COMPANY_FROM_REDUX } from "../constants/registered_service";

const initState = {
    data: [],
    registeredService: {},
    error: false,
    success: true,
    company: {}
}
const registeredServiceReducers = (state = initState, payload) => {
    switch (payload.type) {
        case GET_ALL:
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
        case DELETE:
            return {
                ...state,
                success: true,
                error: false
            }
        case PUSH_COMPANY_TO_REDUX:
            return {
                ...state,
                company: payload.data,
            }
        default:
            return state;
    }
}


export default registeredServiceReducers;