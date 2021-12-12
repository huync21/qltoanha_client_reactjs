import { ERROR } from "../constants/base";
import { GET_MONTHLY_SALARY } from "../constants/monthly_salary";
const initState = {
    data: [],
    statistic: {},
    error: false,
    success: true
}
const monthlySalaryReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_MONTHLY_SALARY:
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


export default monthlySalaryReducers;