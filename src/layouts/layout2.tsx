import * as React from 'react';
import styles from './layout2.module.less';
import { Link, useHistory } from 'react-router-dom';
import {cloneDeep} from 'lodash-es';
//生成访问的item
import ROUTER_CONFIG, { RouteListType } from '../config/router.config';

const { useState, useCallback, useEffect } = React;


console.log(styles)  //模块化使用less或者css

// function childMap(data: RouteListType) {
//     return <div key={`${data.path}`}>
//         <Link to={`${data.path}`} className={`${routerSelectKey == data.path}`} target={data.isNewWindow && '_blank' || ''}>{data.name}</Link>
//         {
//             data.children && data.children.map((child: RouteListType) => childMap(child))
//         }
//     </div>
// }

// //转化
// function routerToJSX(routeList: Array<RouteListType>) {
//     return <>
//         {
//             routeList.map((item: RouteListType, index: number): React.ReactNode => {
//                 return childMap(item)
//             })
//         }
//     </>
// }

function routerChangeAuthority(routerList:Array<RouteListType>) {
    let authority:Array<string> = [];
    const ROUTER_LIST:Array<RouteListType> = cloneDeep(routerList);
    //使用深度优先遍历
    ROUTER_LIST.map((item:RouteListType) => {
        authority = item.authority || [];
        const childMap:Function = (data:RouteListType) => {
            !data.authority ? data.authority = authority : authority = data.authority;
            data.children && data.children.map(child => childMap(child)); //检查是否有下一级，有就继续
        }
        childMap(item);
    })
    return ROUTER_LIST;
}

const USER_AUTHORITY = 'other'; //用户角色,在authority数组去寻找是否有这个角色，有则显示，没有则不渲染

function Layout2(props: RouteListType): React.ReactNode {
    const { children } = props; //获得子元素，渲染到对应的地方即可
    const history = useHistory();
    const [routerSelectKey, setRouterSelectKey] = useState(history.location.pathname);

    useEffect(() => {
        setRouterSelectKey(history.location.pathname);
    }, [history])

    //渲染导航
    const childMap: Function = useCallback(
        (data: RouteListType) => {
            return !data?.hideItem && ((data?.authority || [])?.indexOf(USER_AUTHORITY) > -1 || (data?.authority || [])?.length === 0) && <div key={`${data.path}`}>
                <Link to={`${data.path}`} className={`${routerSelectKey == data.path && styles.active}`} target={data.isNewWindow && '_blank' || ''}>{data.name}</Link>
                {
                    data.children && data.children.map((child: RouteListType) => childMap(child))
                }
            </div>
        },
        [routerSelectKey]
    )
    
    const routerToJSX: Function = useCallback(
        (routeList: Array<RouteListType>) => {
            return <>
                {
                    routerChangeAuthority(routeList).map((item: RouteListType): React.ReactNode => {
                        return childMap(item)
                    })
                }
            </>
        },
        [routerSelectKey]
    )

    return (
        <>
            {/**渲染路由**/}
            <div className={styles.menu}>
                {
                    routerToJSX(ROUTER_CONFIG)
                }
            </div>

            <div className={styles.right}>
                {children}
            </div>
        </>
    );
}



export default Layout2;