import {combineReducers} from 'redux';
import companyReducers from './company';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';
import serviceReducers from './service';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    registeredService: registeredServiceReducers,
    service: serviceReducers
});

export default (state, action) => reducers(state, action);