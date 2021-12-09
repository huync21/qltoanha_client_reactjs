import {combineReducers} from 'redux';
import companyReducers from './company';
import employeeReducers from './employee';
import floorReducers from './floor';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';
import rentedAreaReducers from './rented_area'
import serviceReducers from './service';
import statisticsReducers from './statistics';
import statisticsRentedAreasReducers from './statistics_rented_areas';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    employee: employeeReducers,
    registeredService: registeredServiceReducers,
    floors: floorReducers,
    rentedAreas: rentedAreaReducers,
    service: serviceReducers,
    statistic: statisticsReducers,
    statisticsRentedAreas: statisticsRentedAreasReducers
});

export default (state, action) => reducers(state, action);  