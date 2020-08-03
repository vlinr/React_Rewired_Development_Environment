import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Form, Input, Button,message } from 'antd';
import { login } from '../../actions/login';
import { useHistory } from 'react-router-dom';
import { USER_TOKEN_NAME } from '../../config/config';
const { memo, useCallback, useState } = React;

const FORM_LAYOUT = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
}
const BTN_LAYOUT = {
    wrapperCol: { offset: 4, span: 16 }
}

//校验失败
const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

//登录
const LoginForm = (): React.ReactElement => {
    const dispatch = useDispatch();
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    //校验成功
    const onLoginFinish = useCallback(
        (values: any) => {
            setLoading(true);
            dispatch(login(values.username, values.password, (res: any) => {
                if(res.code != 0){
                    message.error(res.msg);
                    setLoading(false);
                }else{
                    localStorage.setItem(USER_TOKEN_NAME,res.result.token);
                    message.success(res.msg);
                    setLoading(false);
                    setTimeout(() => {
                        history.push('/');
                    }, 1500);
                }
            }));
        },
        [loading],
    )
    return <Form
        {...FORM_LAYOUT}
        name="basic"
        hideRequiredMark={true}
        onFinish={onLoginFinish}
        onFinishFailed={onFinishFailed}
    >
        <Form.Item
            label="账号"
            name="username"
            rules={[{ required: true, message: '请输入账号' }]}
        >
            <Input placeholder="请输入账号(admin)"/>
        </Form.Item>
        <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
        >
            <Input.Password placeholder="请输入密码(admin)" />
        </Form.Item>

        <Form.Item {...BTN_LAYOUT}>
            <Button loading={loading} type="primary" size="large" style={{ width: '100%', marginTop: 20 }} htmlType="submit">
                登录
            </Button>
        </Form.Item>
    </Form>
}

export default memo(LoginForm);