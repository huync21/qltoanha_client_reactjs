import axios from "axios";

export const getAllService = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: 'services',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_ALL',
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

export const getServiceById = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `services/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_ONE',
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


export const createNewService = (data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `services`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            data: data
        })
        if(res.status == 200){
            dispatch({
                type: 'POST',
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

export const updateService = (id, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `services/${id}`,
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

export const deleteService = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `services/${id}`,
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