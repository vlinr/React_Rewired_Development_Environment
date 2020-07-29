//整合所有的reducer
import { combineReducers } from 'redux';
import testReducer from './test';
export default combineReducers({
    testReducer
});