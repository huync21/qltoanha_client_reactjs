import {combineReducers} from 'redux';
import companyReducers from './company';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    registeredService: registeredServiceReducers
});

export default (state, action) => reducers(state, action);