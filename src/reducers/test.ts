//单个reducer的编写

import {
    TEST_SUCCESS
} from '../constants/test';
import { Action } from 'redux';

// import Immutable from 'immutable';
// const store = Immutable.Map({  //数据仓库
//     data: null
// });

interface StoreType {
    data: any
}
//action
interface IAction extends Action {
    type: string,
    payload: any
}
//数据仓库
const store: StoreType = {  //数据仓库
    data: null
};

interface TestReducerType {
    testReducer(state: StoreType, action: IAction): StoreType
}

const testReducer = (state: StoreType = store, action: IAction): StoreType => {
    switch (action.type) {
        case TEST_SUCCESS:
            return { ...state, data: action.payload };
        default:  //必须有返回
            return state;
    }
};

export default testReducer;