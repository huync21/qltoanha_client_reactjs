import {combineReducers} from 'redux';
import companyReducers from './company';
import loginReducers from './login';
import serviceReducers from './service';
const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    service: serviceReducers
});

export default (state, action) => reducers(state, action);