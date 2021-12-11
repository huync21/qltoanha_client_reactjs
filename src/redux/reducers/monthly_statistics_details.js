import { ERROR } from "../constants/base";
import { GET_MONTHLY_BILLS, GET_MONTHLY_SERVICE_BILLS } from "../constants/monthly_statistic_detail";

const initState = {
    bills: [],
    serviceBills: [],
    error: false,
    success: true
}
const monthlyStatisticsDetailReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_MONTHLY_BILLS:
            return {
                ...state,
                bills: payload.data,
                success: true,
                error: false
            }
        case GET_MONTHLY_SERVICE_BILLS:
            return {
                ...state,
                serviceBills: payload.data,
                success: true,
                error: false
            }
        case ERROR:
            return {
                ...state,
                error: true
            }
        default:
            return state;
    }
}


export default monthlyStatisticsDetailReducers;