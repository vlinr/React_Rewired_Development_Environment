//普通页面
import Login from '../pages/Login/index';
import Content from '../pages/Content/index';
import EditContent from '../pages/Content/EditContent';
import NewContent from '../pages/Content/NewContent';
import Contact from '../pages/Contact/index';
import Seo from '../pages/Seo/index';
import About from '../pages/About/index';
import Apply from '../pages/Apply/index';
//布局文件
import UserLayout from '../layouts/UserLayout';
import BackLayout from '../layouts/BackLayout';
//找不到页面
import NotFound from '../pages/NotFound';

import { LOGIN_PATH } from './config';
import { ProfileOutlined, BookOutlined,SearchOutlined, PhoneOutlined,ExpandOutlined} from '@ant-design/icons';

export interface RouteType {
    path: string,
    name: string,
    component?: React.ReactNode | any,
    layout?: React.ReactNode | any,
    exact?: boolean,
}

export interface RouteItemType extends RouteType {
    children?: Array<RouteItemType>,
    isNewWindow?: boolean,
    authority?: Array<string>,
    hideItem?: boolean,
    icon?: React.ReactNode | any
    [moreName: string]: any  //更多参数
}

//配置路由
const ROUTER_CONFIG: Array<RouteItemType> = [
    // {
    //     path: '/home',  //访问路径
    //     layout: BackLayout, //布局，最外层的必须指定
    //     // component: Content, //组件,作为父级没有组件，子集才有
    //     name: '首页概览', //名称
    //     isNewWindow: false,  //是否是新窗口打开
    //     icon: ProfileOutlined,
    //     authority: ['admin', 'other'],//权限拥有者
    //     children: [
    //         {
    //             path: '/home/overview', 
    //             // component: Content,
    //             icon: ProfileOutlined,
    //             name: '内容操作',
    //             children: [
    //                 {
    //                     path: '/home/overview/query', 
    //                     component: Content,
    //                     name: '查询',
    //                 },
    //                 {
    //                     path: '/home/newContent/delete', 
    //                     component: NewContent,
    //                     name: '删除',
    //                 },
    //                 {
    //                     path: '/home/editContent/sign', 
    //                     component: EditContent,
    //                     name: '标记',
    //                 }
    //             ]
    //         },
    //         {
    //             path: '/home/newContent', 
    //             component: NewContent,
    //             name: '新增内容',
    //         },
    //         {
    //             path: '/home/editContent', 
    //             component: EditContent,
    //             hideItem:true,
    //             name: '编辑内容',
    //         }
    //     ]
    // },
    {
        path: '/',  //访问路径
        layout: BackLayout, //布局，最外层的必须指定
        // component: Content, //组件,作为父级没有组件，子集才有
        name: '内容管理', //名称
        isNewWindow: false,  //是否是新窗口打开
        icon: ProfileOutlined,
        authority: ['admin', 'other'],//权限拥有者
        children: [
            {
                path: '/overview',  //访问路径
                component: Content, //组件
                name: '内容概览', //名称
            },
            {
                path: '/newContent',  //访问路径
                component: NewContent, //组件
                name: '新增内容', //名称
            },
            {
                path: '/editContent',  //访问路径
                component: EditContent, //组件
                hideItem:true,
                name: '编辑内容', //名称
            }
        ]
    },
    {
        path: '/seo',  //访问路径
        layout: BackLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: Seo, //组件
        name: 'SEO管理', //名称
        icon: SearchOutlined,
        isNewWindow: false,  //是否是新窗口打开
        authority: ['admin', 'other'],//权限拥有者
    },
    {
        path: '/telphone',  //访问路径
        layout: BackLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: Contact, //组件
        name: '联系管理', //名称
        icon: PhoneOutlined,
        isNewWindow: false,  //是否是新窗口打开
        authority: ['admin', 'other'],//权限拥有者
    },
    {
        path: '/about',  //访问路径
        layout: BackLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: About, //组件
        name: '关于我们', //名称
        icon: BookOutlined,
        isNewWindow: false,  //是否是新窗口打开
        authority: ['admin', 'other'],//权限拥有者
    },
    {
        path: '/cooperation',  //访问路径
        layout: BackLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: Apply, //组件
        name: '需求管理', //名称
        icon: ExpandOutlined,
        isNewWindow: false,  //是否是新窗口打开
        authority: ['admin', 'other'],//权限拥有者
    },
    {
        path: '/404',  //自定义404页面，
        layout: BackLayout,
        hideItem: true,   //是否不显示到菜单
        exact: true,
        name: '404错误',
        component: NotFound,
        children: [

        ]
    },
    {
        path: LOGIN_PATH,  //登录页面的路径
        layout: UserLayout, //布局，最外层的必须指定
        exact: true,  //是否严格匹配
        component: Login, //组件
        name: '微外包管理后台', //名称
        hideItem: true,
        authority: []
    },
]

export default ROUTER_CONFIG;