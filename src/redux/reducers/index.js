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
import monthReducers from './month';
import monthlyStatisticsReducers from './monthly_statistics';
import monthlyStatisticsDetailReducers from './monthly_statistics_details';
import monthlySalaryReducers from './monthly_salary';
import workReducers from './work';
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
    statisticsRentedAreas: statisticsRentedAreasReducers,
    months: monthReducers,
    monthlyStatistics: monthlyStatisticsReducers,
    monthlyStatisticDetail: monthlyStatisticsDetailReducers,
    monthlySalary: monthlySalaryReducers,
    work: workReducers,
});

export default (state, action) => reducers(state, action);  