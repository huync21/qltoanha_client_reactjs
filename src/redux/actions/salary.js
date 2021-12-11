import axios from "axios";

export const getSalaryByService = (serviceId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries/serviceId=${serviceId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_SALARY_BY_SERVICE',
                data: res.data
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const getSalaryById = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            console.log('dispatched');
            dispatch({
                type: 'GET_ONE_SALARY',
                data: res.data,
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const getAllSalary = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_ALL_SALARY',
                data: res.data
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const createNewSalary = (serviceId, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries/create/serviceId=${serviceId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            serviceId: serviceId,
            data: data,
        })
        if(res.status == 200){
            dispatch({
                type: 'CREATE_SALARY',
                data: res.data
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const updateSalary = (id, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            data: data
        })
        if(res.status == 200){
            dispatch({
                type: 'UPDATE',
                data: res.data
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const deleteSalary = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `salaries/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
        })
        if(res.status == 200){
            dispatch({
                type: 'DELETE',
                data: res.data
            })
        }
        else {
            dispatch({
                type: 'ERROR',
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: 'ERROR',
            data: null,
        })
    }
}

export const saveServiceToRedux = (service) => async dispatch => {
    dispatch({
        type: 'SAVE_SERVICE_TO_REDUX',
        data: service,
    })
}