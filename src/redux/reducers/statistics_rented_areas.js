import { ERROR } from "../constants/base";
import { GET_ALL_RENTED_AREA_OF_COMPANY } from "../constants/statistics_rented_areas";

const initState = {
    data: [],
    company: {},
    error: false,
    success: true
}
const statisticsRentedAreasReducers = (state=initState, payload) => {
    switch (payload.type) {
        case GET_ALL_RENTED_AREA_OF_COMPANY:
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


export default statisticsRentedAreasReducers;