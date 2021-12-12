import axios from "axios";

export const getAllBuildingEmployees = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            
            dispatch({
                type: 'GET_ALL_BUILDING_EMPLOYEE',
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

export const getBuildingEmployeeById = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_ONE_BUILDING_EMPLOYEE',
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

export const getBuildingEmployeeByName = (name) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/name/${name}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: 'GET_BUILDING_EMPLOYEE_BY_NAME',
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

export const createNewBuildingEmployee = (salaryId, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/create/salaryId=${salaryId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            salaryId: salaryId,
            data: data,
        })
        if(res.status == 200){
            dispatch({
                type: 'CREATE_BUILDING_EMPLOYEE',
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

export const updateBuildingEmployee = (empId,salaryId, data) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/${empId}/${salaryId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
            data: data
        })
        console.log("res data", res.data)
        if(res.status == 200){
            dispatch({
                type: 'UPDATE_BUILDING_EMPLOYEE',
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

export const deleteBuildingEmployee = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `buildingEmployees/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            },
        })
        if(res.status == 200){
            dispatch({
                type: 'DELETE_BUILDING_EMPLOYEE',
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
