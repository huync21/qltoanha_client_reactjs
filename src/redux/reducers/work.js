import {ERROR} from "../constants/base"
const initState = {
    data: [],
    work: {},
    error: false,
    success: true
}

const workReducers = (state=initState, payload) => {
    switch (payload.type) {
        case 'GET_ALL_WORK':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'GET_ONE_WORK':
            return {
                ...state,
                service: payload.data,
                success: true,
                error: false
            }
        case 'GET_WORK_BY_TITLE_AND_EMP':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'GET_WORK_BY_EMP':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'GET_WORK_BY_TITLE':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'CREATE_WORK':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'UPDATE_WORK':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'DELETE_WORK':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'ERROR':
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}


export default workReducers;