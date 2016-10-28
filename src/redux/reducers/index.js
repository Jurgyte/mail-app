import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import emails from './emails';

const rootReducer = combineReducers({
    emails,
    routing: routerReducer,
});

export default rootReducer;
