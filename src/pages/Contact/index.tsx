import * as React from 'react'
import { Form, Input, InputNumber, Button, message } from 'antd';
const { memo, useCallback, useState } = React;

const { Item } = Form;

const FORM_LAYOUT = {
    labelCol: { span: 3, offset: 4 },
    wrapperCol: { span: 12 },
};
const validateMessages = {
    required: '${label} 地址不为空!',
    types: {
        email: '${label} 格式错误!'
    },
    number: {
        range: '${label} 格式输入不正确',
    },
};
//联系管理
function Content(): React.ReactElement<any> {
    const [edit, setEdit] = useState(false);
    const [saveLoading, setSaveLoading] = useState(false);
    const onFinish = useCallback((values: any) => {
        console.log(values);
        setEdit(false);
        message.success('修改成功');
    }, [edit]);

    const editClickHandle = useCallback(
        () => {
            setEdit(true);
        },
        [edit],
    )
    return <Form {...FORM_LAYOUT} name="nest-messages" style={{ marginTop: 50 }} onFinish={onFinish} validateMessages={validateMessages}>
        <Item name={['name']} label="GitHub地址" rules={[{ required: true }]}>
            <Input disabled={!edit} />
        </Item>
        <Item name={['email']} label="邮箱地址" rules={[{ required: true, type: 'email' }]}>
            <Input disabled={!edit} />
        </Item>
        <Item name={['age']} label="QQ" rules={[{ required: true, type: 'number', min: 10000, max: 99999999999 }]}>
            <InputNumber disabled={!edit} style={{ width: '100%' }} />
        </Item>
        <Item name={['website']} label="微信" rules={[{ required: true }]}>
            <Input disabled={!edit} />
        </Item>
        <Item wrapperCol={{ span: 24 }} style={{ textAlign: "center", marginTop: 50 }}>
            {edit && <Button loading={saveLoading} type="primary" htmlType="submit" size="large" style={{ marginRight: 20, width: 200 }}>
                保存
            </Button>
            }
            {
                !edit && <Button onClick={editClickHandle} size="large" style={{ marginRight: 20, width: 200 }}>
                    修改
            </Button>
            }
        </Item>
    </Form>
}

export default memo(Content);