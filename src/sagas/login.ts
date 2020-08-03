
//单个saga中间件的编写
import { delay, put, takeLatest } from 'redux-saga/effects';
//数据请求
import Request from '../request/Request';
import '../mock/login';
import {
    LOGIN_WAIT,
    LOGIN_SUCCESS
} from '../constants/login';

import {IAction} from '../actions/login';

function* loginFetch({ username,password,callback }: IAction) {
    try {
        yield delay(3000);
        if(username === 'admin' && password === "admin"){
            // const response = yield new Request({
            //     api: '/login',
            //     data: {}
            // }).fetch();
            const data = {
                'code': '0',
                'msg': '登录成功',
                'result': {
                    'name': 'Administrator',
                    "headUrl": 'https://upload.jianshu.io/users/upload_avatars/19110551/faff3ea5-1ca4-4946-a314-9fca88a3d5f2?imageMogr2/auto-orient/strip|imageView2/1/w/80/h/80/format/webp',
                    'userType': 'admin',
                    'token': 'ANJKDS-DSALKKM-DSAKLJ-DSABJ-DSANJK-DSAKJKL'
                }
            }
            yield put({ type: LOGIN_SUCCESS, payload: data.result});
            callback && callback(data)
        }else{
            const data = {
                'code': '1',
                'msg': '账号或密码错误',
                'result': {
                }
            }
            callback && callback(data)
        }

    } catch (error) {
        console.error(error);
    }
}
export function* login() {
    // yield takeLatest(TEST_DEFAULT, testFetch);
    yield takeLatest(LOGIN_WAIT, loginFetch);
}