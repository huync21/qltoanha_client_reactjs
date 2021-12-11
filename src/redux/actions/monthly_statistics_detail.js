import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_MONTHLY_BILLS, GET_MONTHLY_SERVICE_BILLS } from "../constants/monthly_statistic_detail";

export const getAllMonthlyBills = (companyId,monthId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `monthlyBills/get-monthly-bill-by-company-and-month?companyId=${companyId}&monthId=${monthId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: GET_MONTHLY_BILLS,
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

export const getAllMonthlyServiceBills = (companyId,monthId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `monthlyServiceBills/find-all-by-company-and-month?companyId=${companyId}&monthId=${monthId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: GET_MONTHLY_SERVICE_BILLS,
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


