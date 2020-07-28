import * as React from 'react'
import { Redirect, Route } from 'react-router-dom';
//检查用户是否登录等操作，如果没有登录，则重定向到登录页面，如果登录了，就返回传进来的组件
function AuthRouter({ component:Component,children, layout:Layout, ...rest }) {
    return (
        <Layout>
            <Route
                {...rest}
                render={({ location }) => {
                    //判断是否登录，判断是否为无效路径均在此处理
                    // if ('登录了') {
                        return <Component />;
                    // }
                    // return (
                    //     <Redirect to={{ pathname: `/login`, state: { from: location } }} />
                    // );
                }}
                />
        </Layout>
    );

}
export default AuthRouter;


//路由转化