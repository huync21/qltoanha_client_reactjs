import {combineReducers} from 'redux';
import companyReducers from './company';
import loginReducers from './login';

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers
});

export default (state, action) => reducers(state, action);