import {
    TEST_SUCCESS
} from '../constants/test';
// import Immutable from 'immutable';
// const store = Immutable.Map({  //数据仓库
//     data: null
// });

export interface StoreType {
    data: any
}

const store: StoreType = {  //数据仓库
    data: null
};

export interface TestReducerType {
    
}

const testReducer:Function = (state: StoreType = store, action: any):StoreType => {
    switch (action.type) {
        case TEST_SUCCESS:
            return { ...state, data: action.payload };
        default:  //必须有返回
            return state;
    }
};

export default testReducer;