import {combineReducers} from 'redux';
import companyReducers from './company';
import floorReducers from './floor';
import loginReducers from './login';
import registeredServiceReducers from './registered_service';
import rentedAreaReducers from './rented_area'

const reducers = combineReducers({
    login: loginReducers,
    company: companyReducers,
    registeredService: registeredServiceReducers,
    floors: floorReducers,
    rentedAreas: rentedAreaReducers
});

export default (state, action) => reducers(state, action);