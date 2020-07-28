import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
//路由配置文件
import ROUTER_CONFIG from '../config/router.config';
//重写路由，对布局进行更改
import AuthRouter from './router';
//转化
function routerToFlatten(routeList) {
    let result = []
        , layout = '';
    //使用深度优先遍历
    routeList.map(item => {
        layout = item.layout;
        const childMap = (data) => {
            !data.layout ? data.layout = layout : layout = data.layout; //检查是否有布局，没有就使用上一次检测出来的布局
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
                    return <AuthRouter exact key={index} path={item.path} component={item.component} layout={item.layout} ></AuthRouter>
                })
            }
        </Switch>
    </Router>
);




//路由组件关联