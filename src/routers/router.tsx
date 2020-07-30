//路由渲染，包括登录重定向
import * as React from 'react'

import { Redirect, Route } from 'react-router-dom';
import { LOGIN_PATH } from '../config/config';
import {RouteType} from '../config/router.config';

const { memo } = React;

//用户是否登录
const USER_LOGIN_SUCCESS: boolean = true; //这个应该放在路由切换的时候，进行校验

//检查用户
function AuthRouter({ component: Component, layout: Layout,path, ...rest }: RouteType): React.ReactElement<RouteType> {
    if (path === LOGIN_PATH) {
        return (
            <Layout>
                <Route
                    {...rest}
                    path={path}
                    render={(): JSX.Element => {
                        return <Component />
                    }}
                />
            </Layout>
        );
    }
    return (
        <Layout>
            <Route
                {...rest}
                path={path}
                render={({ location }): JSX.Element => {
                    //在此处校验是否登录
                    if (!USER_LOGIN_SUCCESS) return <Redirect to={{ pathname: LOGIN_PATH, state: location }} />
                    return <Component />
                }}
            />
        </Layout>
    );

}

export default memo(AuthRouter);
