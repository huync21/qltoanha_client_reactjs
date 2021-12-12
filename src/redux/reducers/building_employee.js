const initState = {
    data: [],
    buildingEmployee: {},
    error: false,
    success: true,
}

const buildingEmployeeReducers = (state = initState, payload) => {
    switch (payload.type) {
        case 'GET_ALL_BUILDING_EMPLOYEE':
            return {
                ...state,
                data: payload.data,
                success: true,
                error: false
            }
        case 'GET_ONE_BUILDING_EMPLOYEE':
            return{
                ...state,
                data: payload.data,
                success: true,
                error: false,
            }
        case 'GET_BUILDING_EMPLOYEE_BY_NAME':
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
        case 'DELETE_BUILDING_EMPLOYEE':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'UPDATE_BUILDING_EMPLOYEE':
            return {
                ...state,
                success: true,
                error: false
            }
        case 'CREATE_BUILDING_EMPLOYEE':
            return {
                ...state,
                success: true,
                error: false,
            }
        default:
            return state;
    }
}


export default buildingEmployeeReducers;