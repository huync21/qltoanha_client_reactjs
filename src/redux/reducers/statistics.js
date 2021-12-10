import { ERROR } from "../constants/base";
import { GET_ALL_STATISTICS} from "../constants/statistics";

const initState = {
    data: [],
    company: {},
    error: false,
    success: true
}
const statisticsReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_ALL_STATISTICS:
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


export default statisticsReducers;