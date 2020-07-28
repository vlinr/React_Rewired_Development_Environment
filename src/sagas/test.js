
import { delay, put, select, takeLatest } from 'redux-saga/effects';

import {isObject} from 'lodash-es';

//数据请求
import Request from '../request/Request';

import {
    TEST_DEFAULT,
    TEST_SUCCESS
} from '../constants/test';

// export interface TestFetchType{
//     name:String
// }

function* testFetch({ name }) {
    console.log(isObject(name))
    try {
        //不使用代理
       const response = yield new Request({
            url:'https://router.this1.cn',
            api:'/level',
            data:{}
        }).fetch();

        //使用代理
        // const response = yield new Request({
        //     url:'',
        //     api:'/api/level',
        //     data:{}
        // }).fetch();
        console.log(response)
        yield put({ type: TEST_SUCCESS, payload: response.result });
    } catch (error) {
        console.error(error);
    }
}
export function* test() {
    yield takeLatest(TEST_DEFAULT, testFetch);
}