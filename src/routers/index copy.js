import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Layout1 from '../layouts/layout1';
import Layout2 from '../layouts/layout2';
import TestPage from '../pages/test/index.tsx';
import TestPage1 from '../pages/test1/index.tsx';
import TestPage2 from '../pages/test2/index.tsx';

//重写路由，对布局进行更改
import AuthRouter from './router';
/****
 * 1.创建router，并编写最外层switch,这个保证了只匹配一个
 * 2.设置布局包裹对应的路由，代表该路由需要渲染到这个地方
 * *******/
export default (
    <Router>
        <Switch>
            <AuthRouter exact path={`/login`} component={TestPage} layout={Layout1} ></AuthRouter>
            {/* <Switch> */}
            {/**重写路由处理器，书写Render方法***/}
            <AuthRouter exact path={`/`} component={TestPage1} layout={Layout2} ></AuthRouter> {/**直接去登录页面，判断是否登录 */}
            <AuthRouter exact path={`/dashboard`} component={TestPage2} layout={Layout2} ></AuthRouter>
            
            <AuthRouter exact path={`/permission`} component={TestPage2} layout={Layout2} ></AuthRouter>

            {/* <Route component={NotFound} /> */}
            {/* </Switch> */}
        </Switch>
    </Router>
);




//废弃