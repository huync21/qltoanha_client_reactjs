import { ERROR } from "../constants/base";
import { GET_ALL_MONTHLY_STAT_OF_COMPANIES } from "../constants/monthly_statistics";
const initState = {
    data: [],
    statistic: {},
    error: false,
    success: true
}
const monthlyStatisticsReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_ALL_MONTHLY_STAT_OF_COMPANIES:
            return {
                ...state,
                data: payload.data,
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


export default monthlyStatisticsReducers;