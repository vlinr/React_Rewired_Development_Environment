
//单个saga中间件的编写
import { delay, put, takeLatest } from 'redux-saga/effects';
//数据请求
import Request from '../request/Request';
import { REQUEST_SUCCESS } from '../config/config';
import {
    LOGIN_WAIT,
    LOGIN_SUCCESS
} from '../constants/login';
import {
    DOMAIN, LOGIN_URL
} from '../config/api.config';
import { IAction } from '../actions/login';

function* loginFetch({ username, password, callback }: IAction) {
    try {
        const response = yield new Request({
            api: LOGIN_URL,
            method: 'POST',
            data: {
                username, password
            }
        }).fetch();
        if (response.code === REQUEST_SUCCESS) {
            yield put({ type: LOGIN_SUCCESS, payload: response.data });
        }
        callback && callback(response)
    } catch (error) {
        console.error(error);
    }
}
export function* login() {
    yield takeLatest(LOGIN_WAIT, loginFetch);
}