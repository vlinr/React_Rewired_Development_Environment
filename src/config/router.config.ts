//普通页面
import TestPage from '../pages/test/index';
import TestPage1 from '../pages/test1/index';
import TestPage2 from '../pages/test2/index';
//布局文件
import Layout1 from '../layouts/layout1';
import Layout2 from '../layouts/layout2';
//找不到页面
import NotFound from '../pages/NotFound';

import { LOGIN_PATH } from './config';

export interface RouteType{
    path: string,
    component: React.ReactNode | any,
    layout?:React.ReactNode | any,
    exact?: boolean,
}

export interface RouteItemType extends RouteType{
    name: string,
    children?: Array<RouteItemType>,
    isNewWindow?: boolean,
    authority?: Array<string>,
    hideItem?: boolean,
    [more:string]:any  //更多参数
}

//配置路由
const ROUTER_CONFIG: Array<RouteItemType> = [
    {
        path: '/',  //访问路径
        layout: Layout2, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: TestPage, //组件
        name: 'Page1', //名称
        isNewWindow: true,  //是否是新窗口打开
        authority: ['admin', 'other'],//权限拥有者
    },

    {
        path: '/page',  //访问路径
        layout: Layout1, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: TestPage, //组件
        name: 'Page2', //名称
        // isNewWindow:true,
        authority: ['admin'],
        children: [
            {
                path: '/page/pageOne',  //访问路径，自定义
                exact: true,
                component: TestPage1,
                name: "Page2-1",
                authority: ['other'],
                children: [
                    {
                        path: '/page/pageOne/pageOneChild',
                        exact: true,
                        layout: Layout2,
                        component: TestPage2,
                        name: "Page2-1-1",
                        children: [

                        ]
                    },
                ]
            },
            {
                path: '/page/pageTwo',
                exact: true,
                component: TestPage2,
                name: 'Page2-2',
                children: [

                ]
            }
        ]
    },
    {
        path: '/pageThree',
        layout: Layout2,
        exact: true,
        name: 'Page3',
        component: TestPage1,
        // isNewWindow:true,
        children: [

        ]
    },
    {
        path: '/pageFour',
        layout: Layout2,
        exact: true,
        name: 'Page4',
        component: TestPage2,
        authority: ['admin', 'other'],
        children: [

        ]
    },
    {
        path: '/404',  //自定义404页面，
        layout: Layout2,
        hideItem: true,   //是否不显示到菜单
        exact: true,
        name: '页面未找到',
        component: NotFound,
        children: [

        ]
    },
    {
        path: LOGIN_PATH,  //登录页面的路径
        layout: Layout1, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: TestPage, //组件
        name: 'Login', //名称
        authority: []
    },
]

export default ROUTER_CONFIG;