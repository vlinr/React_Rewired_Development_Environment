//整合所有的reducer
import { combineReducers } from 'redux';
import login from './login'; // 引入局部reducer
export default combineReducers({
    login
});