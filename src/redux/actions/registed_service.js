import axios from "axios";
import { ERROR } from "../constants/base";
import { DELETE, GET_ALL,PUSH_COMPANY_TO_REDUX,GET_COMPANY_FROM_REDUX } from "../constants/registered_service";
export const getAllRegisterdServices = (company) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/companyId=${company.id}`,
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

export const deleteRegisterdService = (id) => async dispatch => {
    try {
        const res = await axios({
            method: 'DELETE',
            baseURL: process.env.REACT_APP_URL_API,
            url: `service-registrations/${id}`,
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

export const saveCompanyToRedux = (company) => async dispatch => {
            dispatch({
                type: PUSH_COMPANY_TO_REDUX,
                data: company
            })
}

