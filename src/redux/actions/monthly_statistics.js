import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_ALL_MONTHLY_STAT_OF_COMPANIES } from "../constants/monthly_statistics";


export const getAllMonthlyStatsOfCompanies = (month) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `company/monthly_total_fee/monthId=${month.id}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: GET_ALL_MONTHLY_STAT_OF_COMPANIES,
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