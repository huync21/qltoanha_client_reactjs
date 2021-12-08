import axios from "axios";
import { ERROR } from "../constants/base";
import { GET_ALL_RENTED_AREA_OF_COMPANY } from "../constants/statistics_rented_areas";

export const getAllRentedAreasOfCompany = (companyId) => async dispatch => {
    try {
        const res = await axios({
            method: 'GET',
            baseURL: process.env.REACT_APP_URL_API,
            url: `rented-areas/companyId=${companyId}`,
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
                "Content-Type": "application/json" 
            }
        })
        if(res.status == 200){
            dispatch({
                type: GET_ALL_RENTED_AREA_OF_COMPANY,
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



