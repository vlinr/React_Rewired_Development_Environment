//action撰写
import {
    LOGIN_WAIT
} from '../constants/login';
import { Action } from 'redux';
//必须这样继承，否则takeLatest会报错
export interface IAction extends Action{
    username:string,
    password:string,
    callback?:Function
}
//登录
export const login = (username: string, password: string,callback?:Function): IAction => ({
    type: LOGIN_WAIT,
    password,
    username,
    callback
});