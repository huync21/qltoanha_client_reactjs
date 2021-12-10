import {combineReducers} from 'redux';
import buildingEmployeeReducers from './building_employee';
import companyReducers from './company';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';
import salaryReducers from './salary';
import serviceReducers from './service';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    registeredService: registeredServiceReducers,
    service: serviceReducers,
    salary: salaryReducers,
    buildingEmployee: buildingEmployeeReducers,
});

export default (state, action) => reducers(state, action);