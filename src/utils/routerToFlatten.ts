import { RouteItemType } from '../config/router.config';
import {cloneDeep} from 'lodash-es';
const routerFlatten = (routeList: Array<RouteItemType>):Array<any> => {
    let result: Array<RouteItemType> = [];  //这里定义为Array<RouteItemType>，默认会把/得path更换掉
    //使用深度优先遍历
    cloneDeep(routeList).map((item: RouteItemType) => {
        const childMap = (data: RouteItemType) => {
            result.push(data);//扁平化处理  
            data.children && data.children.map((child: RouteItemType) => childMap(child)); //检查是否有下一级，有就继续
        }
        item.parent = true;
        childMap(item);
    })
    return result;
}

const routerFlattenAndChangeInfo = (routeList: Array<RouteItemType>) => {
    let result: Array<any> = []
        , layout: React.ReactNode = '';
    //使用深度优先遍历
    cloneDeep(routeList).map((item: RouteItemType) => {
        layout = item.layout;
        item.authority = item.authority || [];
        const childMap = (data: RouteItemType) => {
            !data.layout ? data.layout = layout : layout = data.layout; //检查是否有布局，没有就使用上一次检测出来的布局
            data.authority = data.authority || [];
            result.push(data);//扁平化处理
            data.children && data.children.map(child => childMap(child)); //检查是否有下一级，有就继续
        }
        childMap(item);
    })
    return result;
}
export {
    routerFlattenAndChangeInfo,
    routerFlatten
}