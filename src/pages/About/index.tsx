import * as React from 'react'
import BraftEditor from 'braft-editor';
// import ColorPicker from 'braft-extensions/dist/color-picker';
import './index.module.less';
import { Form, Button, message } from 'antd';
const { memo, useCallback, useState } = React;
const { Item } = Form;

const FORM_LAYOUT = {
    wrapperCol: { span: 22, offset: 1 },
};
//定义一个类型，相当于默认数据
declare const ThemeTypes: ['dark', 'light'];
interface OptionsType {
    includeEditors?: Array<string>
    excludeEditors?: Array<string>
    theme?: typeof ThemeTypes[number]
}
const options: OptionsType = {
    includeEditors: ['editor'], // 指定该模块对哪些BraftEditor生效，不传此属性则对所有BraftEditor有效
    // excludeEditors: ['editor-id-2'],  // 指定该模块对哪些BraftEditor无效
    theme: 'light', // 指定取色器样式主题，支持dark和light两种样式
}

// console.log(ColorPicker)

// BraftEditor.use(ColorPicker(options));

//关于我们
function About(): React.ReactElement<any> {
    const [saveLoading, setSaveLoading] = useState(false);
    const [edit, setEdit] = useState(false);

    const editClickHandle = useCallback(
        () => {
            setEdit(true);
        },
        [edit],
    )
    const onFinish = useCallback((values: any) => {
        console.log(values);
        setEdit(false);
        message.success('修改成功');
    }, [edit]);
    return <Form {...FORM_LAYOUT} name="nest-messages" style={{ marginTop: 50 }} onFinish={onFinish}>
        <Item name={"content"}>
            <BraftEditor
                id="editor"
                readOnly={!edit}
                placeholder="请输入内容"
                style={{ border: '1px solid #d9d9d9' }}
            />
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

export default memo(About);