//路由渲染，包括登录重定向
import * as React from 'react'

import { Redirect, Route } from 'react-router-dom';
import { LOGIN_PATH } from '../config/config';
import { RouteType } from '../config/router.config';
import { USER_TOKEN_NAME } from '../config/config';
const { memo } = React;

//检查用户
function AuthRouter({ component: Component, layout: Layout, path, name, ...rest }: RouteType): React.ReactElement<RouteType> {
    //登录
    if (path === LOGIN_PATH) {
        return (
            <Layout>
                <Route
                    {...rest}
                    path={path}
                    render={(): JSX.Element => {
                        document.title = name;
                        localStorage.removeItem(USER_TOKEN_NAME);
                        return <Component />
                    }}
                />
            </Layout>
        );
    }
    //正常渲染
    return (
        <Layout>
            <Route
                {...rest}
                path={path}
                render={({ location }): JSX.Element => {
                    document.title = name;
                    //在此处校验是否登录
                    if (!localStorage.getItem(USER_TOKEN_NAME)) return <Redirect to={{ pathname: LOGIN_PATH, state: location }} />
                    return <Component />
                }}
            />
        </Layout>
    );

}

export default memo(AuthRouter);
