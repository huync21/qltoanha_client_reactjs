import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_THE_REST_AREA } from "../constants/floor";
import { DELETE, GET_ALL, GET_ALL_COMPANIES, UPDATE, REGISTER_CONTRACT, GET_COMPANIES_FOR_REGISTRATION_BY_NAME } from "../constants/rented_area";


export const getAllRentedAreas = (floorId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `rented-areas/floorId=${floorId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_ALL,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const getAllCompanyForRegistration = () => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: 'company',
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_ALL_COMPANIES,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const updateRegisterdRentedArea = (id, registedRentedArea) => async dispatch => {
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `rented-areas/${id}`,
            data: registedRentedArea,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: UPDATE,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}
export const getTheRestArea = (floorId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `floors/available-area/${floorId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_THE_REST_AREA,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const createContract = (companyId, floorId, contract) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `rented-areas?companyId=${companyId}&floorId=${floorId}`,
            data: contract,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: REGISTER_CONTRACT,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}

export const deleteRentedArea = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `rented-areas/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: DELETE,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}
export const getCompaniesForRegistrationByName = (name) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company/name=${name}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json"
            }
        })
        if (res.status == 200) {
            dispatch({
                type: GET_COMPANIES_FOR_REGISTRATION_BY_NAME,
                data: res.data
            })
        }
        else {
            dispatch({
                type: ERROR,
                data: null,
            })
        }
    } catch (error) {
        dispatch({
            type: ERROR,
            data: null,
        })
    }
}
