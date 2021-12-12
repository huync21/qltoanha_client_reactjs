import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_MONTHLY_SALARY } from "../constants/monthly_salary";


export const getAllSalaryOfMonth = (month) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `monthlySalaries/monthId=${month?.id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: GET_MONTHLY_SALARY,
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