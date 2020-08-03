//单个reducer的编写

import {
    LOGIN_SUCCESS
} from '../constants/login';
import { Action } from 'redux';

// import Immutable from 'immutable';
// const store = Immutable.Map({  //数据仓库
//     data: null
// });

export interface StoreType {
    userInfo: any
}
//action
interface IAction extends Action {
    type: string,
    payload: any
}
//数据仓库
const loginStore: StoreType = {  //数据仓库
    userInfo: null
};

const login = (state: StoreType = loginStore, action: IAction): StoreType => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return { ...state, userInfo: action.payload };
        default:  //必须有返回
            return state;
    }
};

export default login;