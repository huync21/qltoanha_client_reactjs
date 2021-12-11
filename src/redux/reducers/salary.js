const initState = {
    data: [],
    service: {},
    salary: {},
    error: false,
    success: true,
}

const salaryReducers = (state = initState, payload) => {
    switch (payload.type) {
        case 'GET_SALARY_BY_SERVICE':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'GET_ONE_SALARY':
            return{
                ...state,
                salary: payload.data,
                success: true,
                error: false,
            }
        case 'GET_ALL_SALARY':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'ERROR':
            return {
                ...state,
                error: true
            }
        case 'DELETE':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'UPDATE':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'SAVE_SERVICE_TO_REDUX':
            return {
                ...state,
                service: payload.data,
            }
        case 'CREATE_SALARY':
            return {
                ...state,
                success: true,
                error: false,
            }
        default:
            return state;
    }
}


export default salaryReducers;