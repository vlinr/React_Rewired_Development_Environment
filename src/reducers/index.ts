//整合所有的reducer
import { combineReducers } from 'redux';
import testReducer from './test'; // 引入局部reducer
export default combineReducers({
    testReducer
});