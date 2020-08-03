import * as React from 'react';
import styles from './index.module.less';
import LoginForm from '../../components/LoginForm';
const { memo} = React;

const Login = (): React.ReactElement => {
    return <div className={styles.login}>
        <div className={styles.box}>
            <h1>微外包管理后台登录</h1>
            <LoginForm />
        </div>
    </div>
}

export default memo(Login);