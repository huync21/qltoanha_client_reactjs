import axios from "axios";
import { ERROR } from "../constants/base";
import { DELETE, ERROR_EXISTED_SERVICE_REGISTRATION, GET_ALL,GET_ALL_SERVICES_TO_ADD,PUSH_COMPANY_TO_REDUX,REGISTER_SERVICE_FOR_COMPANY,UPDATE } from "../constants/registered_service";
export const getAllRegisterdServices = (companyId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/companyId=${companyId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
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

export const updateRegisterdService = (id,registerdService) => async dispatch =>{
    try {
        const res = await axios({
            method: 'PUT',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/${id}`,
            data: registerdService,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
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

export const deleteRegisterdService = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/${id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        })
        if(res.status == 200){
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

export const getALLServicesToAdd = () => async dispatch =>{
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: "services",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            console.log("getAllServiceToAdd")
            dispatch({
                type: GET_ALL_SERVICES_TO_ADD,
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

export const registerServiceForCompany = (idCompany,idService,data) => async dispatch => {
    try {
        const res = await axios({
            method: 'POST',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/register-new-service?companyId=${idCompany}&serviceId=${idService}`,
            data: data,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: REGISTER_SERVICE_FOR_COMPANY,
                data: res.data.message
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

export const saveCompanyToRedux = (company) => async dispatch => {
            dispatch({
                type: PUSH_COMPANY_TO_REDUX,
                data: company
            })
}

