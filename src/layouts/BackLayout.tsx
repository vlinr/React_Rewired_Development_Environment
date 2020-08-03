import * as React from 'react';
import styles from './backlayout.module.less';
import { Layout, Menu, Avatar, Dropdown } from 'antd';
import { LogoutOutlined, DownOutlined, UserOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { RouteItemType } from '../config/router.config';
import CustomMent from './CustomMenu';
import { useSelector } from 'react-redux';
import { StoreType } from '../reducers/login';
import { createSelector } from 'reselect';
import { USER_TOKEN_NAME } from '../config/config';
//取到数据仓库的store下的data
const userInfoReducer = createSelector(
    (state: any) => state.login,
    (login: StoreType) => login.userInfo
);
const { Header, Content, Footer } = Layout;
const { useState, useCallback, memo, useRef } = React;

const TOP_INFO: React.ReactElement = (
    <Menu>
        <Menu.Item icon={<LogoutOutlined />} onClick={()=>{
            console.log('退出登录');
            localStorage.removeItem(USER_TOKEN_NAME);
            window.location.reload();
        }}>
            退出登录
        </Menu.Item>
    </Menu>
);

interface MenuRefType {
    current: MenuCurrentType | null
}
interface MenuCurrentType {
    toggle?: Function
}

function BackLayout(props: RouteItemType): React.ReactElement<RouteItemType> {
    const { children } = props; //获得子元素，渲染到对应的地方即可
    const userInfo = useSelector(userInfoReducer); //用户信息
    const [collapsed, setCollapsed] = useState(false);
    const menuRef = useRef(null) as MenuRefType;
    const setParentCollapsed: Function = useCallback((value: boolean) => {
        setCollapsed(value);
    }, [])
    //调用子元素得方法
    const toggle = useCallback(() => {
        menuRef?.current?.toggle?.();
    }, [])
    return (
        <div className={styles.layout}>
            <Layout style={{ minHeight: '100vh' }}>
                <CustomMent ref={menuRef} collapsed={collapsed} setParentCollapsed={setParentCollapsed} />
                <Layout className={styles.sublayout}>
                    <Header className={styles.header} style={{ padding: 0 }}>
                        {/**渲染顶部**/}
                        {/* {
                            collapsed?<MenuUnfoldOutlined onClick={toggle} />:<MenuFoldOutlined  onClick={toggle}/>
                        } */}
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            onClick: toggle
                        })}
                        <div className={styles.userInfo}>
                            <Dropdown overlay={TOP_INFO} placement="bottomCenter" arrow>
                                <div className={styles.box}>
                                    <Avatar icon={<UserOutlined />} src={userInfo?.headUrl || <UserOutlined />} />
                                    <b>{userInfo?.name}</b>
                                    <DownOutlined style={{ fontSize: 15, marginLeft: 5, position: 'relative', top: 2 }} />
                                </div>
                            </Dropdown>
                        </div>
                    </Header>
                    <Content
                        className={styles.content}
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                        }}
                    >
                        {/**渲染内容**/}
                        {children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>微外包管理后台 ©2020 版权所有</Footer>
                </Layout>
            </Layout>
        </div>
    )
}



export default memo(BackLayout);