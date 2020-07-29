import * as React from 'react'
import { Redirect, Route } from 'react-router-dom';

const { memo } = React;
interface AuthRouterType {
    component: any,
    layout: any,
    exact: boolean,
    path: string,
}

//检查用户是否登录等操作，如果没有登录，则重定向到登录页面，如果登录了，就返回传进来的组件
function AuthRouter({ component: Component, layout: Layout, ...rest }:AuthRouterType): React.ReactElement {
    console.log(Component)
    return (
        <Layout>
            <Route
                {...rest}
                render={({ location }) => {
                    //针对登录得系统，需要在此判断是否登录，没有登录进行重定向到登录页面
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
export default memo(AuthRouter);


//路由转化