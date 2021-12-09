import { ERROR } from "../constants/base";
import { GET_ALL, DELETE, PUSH_COMPANY_TO_REDUX, UPDATE, GET_ALL_SERVICES_TO_ADD, REGISTER_SERVICE_FOR_COMPANY, ERROR_EXISTED_SERVICE_REGISTRATION, GET_COMPANIES_FOR_REGISTRATION_BY_NAME, GET_ALL_COMPANY, GET_ALL_SERVICES, GET_SERVICES_BY_NAME } from "../constants/registered_service";

const initState = {
    data: [],
    registeredService: {},
    error: false,
    success: true,
    company: {},
    allServices: [],
    message: ""
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
        case UPDATE:
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
        case GET_ALL_SERVICES_TO_ADD:
            return {
                ...state,
                allServices: payload.data
            }
        case REGISTER_SERVICE_FOR_COMPANY:
            console.log("message reducer 200: ", payload.data)
            return {
                ...state,
                message: payload.data

            }
        case ERROR_EXISTED_SERVICE_REGISTRATION:
            console.log("message reducer 417: ", payload.data)
            return {
                ...state,
                message: payload.data,
            }
        case GET_COMPANIES_FOR_REGISTRATION_BY_NAME:
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case GET_ALL_COMPANY:
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case GET_ALL_SERVICES:
            return {
                ...state,
                allServices: payload.data,
                success: true,
                error: false
            }
        case GET_SERVICES_BY_NAME:
            return {
                ...state,
                allServices: payload.data,
                success: true,
                error: false
            }
        default:
            return state;
    }
}


export default registeredServiceReducers;