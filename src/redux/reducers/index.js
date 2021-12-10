import {combineReducers} from 'redux';
import buildingEmployeeReducers from './building_employee';
import companyReducers from './company';
import employeeReducers from './employee';
import floorReducers from './floor';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';
import salaryReducers from './salary';
import serviceReducers from './service';
import statisticsReducers from './statistics';
import statisticsRentedAreasReducers from './statistics_rented_areas';
import rentedAreaReducers from './rented_area';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    employee: employeeReducers,
    registeredService: registeredServiceReducers,
    service: serviceReducers,
    salary: salaryReducers,
    buildingEmployee: buildingEmployeeReducers,
    floors: floorReducers,
    rentedAreas: rentedAreaReducers,
    statistic: statisticsReducers,
    statisticsRentedAreas: statisticsRentedAreasReducers
});

export default (state, action) => reducers(state, action);  