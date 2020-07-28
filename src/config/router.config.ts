
import TestPage from '../pages/test/index';
import TestPage1 from '../pages/test1/index';
import TestPage2 from '../pages/test2/index';
import Layout1 from '../layouts/layout1';
import Layout2 from '../layouts/layout2';

//子集类型
export interface RouteListType {
    path: String,
    name: String,
    component: React.ReactNode,
    layout?: React.ReactNode,
    exact?: boolean,
    children?: Array<RouteListType>,
    isNewWindow?:boolean
}

//配置路由
const ROUTER_CONFIG:Array<RouteListType> = [
    {
        path: '/',  //访问路径
        layout: Layout2, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: TestPage, //组件
        name: 'Page1', //名称
        isNewWindow:true,  //是否是新窗口打开
    },
    {
        path: '/page',  //访问路径
        layout: Layout1, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: TestPage, //组件
        name: 'Page2', //名称
        // isNewWindow:true,
        children: [
            {
                path: '/page/pageOne',  //访问路径，自定义
                exact: true,
                component: TestPage1,
                name: "Page2-1",
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
        component: TestPage,
        // isNewWindow:true,
        children: [

        ]
    },
    {
        path: '/pageFour',
        layout: Layout2,
        exact: true,
        name: 'Page4',
        component: TestPage,
        children: [

        ]
    }
]

export default ROUTER_CONFIG;