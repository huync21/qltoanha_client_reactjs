import axios from "axios";

export const getWorkByEmpId = (empId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/empId=${empId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_WORK_BY_EMP',
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

export const getWorkByTitleAndEmpId = (empId, title) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/empId=${empId}/title=${title}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_WORK_BY_TITLE_AND_EMP',
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

export const getWorkById = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            console.log('dispatched');
            dispatch({
                type: 'GET_ONE_WORK',
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

export const getWorkByTitle = (title) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/title=${title}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            console.log('dispatched');
            dispatch({
                type: 'GET_WORK_BY_TITLE',
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

export const getAllWork = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_ALL_WORK',
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

export const createNewWork = (empId, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/create/empId=${empId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            data: data,
        })
        if(res.status == 200){
            dispatch({
                type: 'CREATE_WORK',
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

export const updateWork = (workId, empId, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/${workId}/${empId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            data: data
        })
        if(res.status == 200){
            dispatch({
                type: 'UPDATE_WORK',
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

export const deleteWork = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `work/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
        })
        if(res.status == 200){
            dispatch({
                type: 'DELETE_WORK',
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