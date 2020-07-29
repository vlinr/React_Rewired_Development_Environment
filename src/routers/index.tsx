import React from 'react';
import { BrowserRouter as Router, Switch ,Redirect} from 'react-router-dom';
//路由配置文件
import ROUTER_CONFIG,{RouteListType} from '../config/router.config';
//重写路由，对布局进行更改
import AuthRouter from './router';
const userAuthority = 'admin'; //用户角色,在authority数组去寻找是否有这个角色，有则显示，没有则不渲染


//转为一维数组，并且处理
function routerToFlatten(routeList:Array<RouteListType>) {
    let result:Array<RouteListType> = []
        , layout:React.ReactNode = ''
        , authority:Array<string> = [];
    //使用深度优先遍历
    routeList.map((item:RouteListType) => {
        layout = item.layout;
        authority = item.authority || [];
        const childMap = (data:RouteListType) => {
            !data.layout ? data.layout = layout : layout = data.layout; //检查是否有布局，没有就使用上一次检测出来的布局
            !data.authority ? data.authority = authority : authority = data.authority;
            result.push(data);//扁平化处理
            data.children && data.children.map(child => childMap(child)); //检查是否有下一级，有就继续
        }
        childMap(item);
    })
    return result;
}
export default (
    <Router>
        <Switch>
            {
                routerToFlatten(ROUTER_CONFIG).map((item, index) => {
                    return ((item?.authority || [])?.indexOf(userAuthority) > -1 || (item?.authority || [])?.length === 0) && <AuthRouter exact key={index} path={item.path} component={item.component} layout={item.layout} ></AuthRouter>
                })
            }
            <Redirect to="/404" />
        </Switch>
    </Router>
);




//路由组件关联