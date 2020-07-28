import * as React from 'react';
import styles from './layout2.module.less';
import { Link, useHistory } from 'react-router-dom';
//生成访问的item
import ROUTER_CONFIG, { RouteListType } from '../config/router.config';
const { useState, useCallback, useEffect } = React;
console.log(styles)
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



function Layout2(props: any): React.ReactNode {
    const { children } = props; //获得子元素，渲染到对应的地方即可
    const [routerSelectKey, setRouterSelectKey] = useState('');
    const history = useHistory();

    useEffect(() => {
        setRouterSelectKey(history.location.pathname);
    }, [history])

    const childMap: Function = useCallback(
        (data: RouteListType) => {
            return <div key={`${data.path}`}>
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
                    routeList.map((item: RouteListType): React.ReactNode => {
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