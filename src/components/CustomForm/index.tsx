
import * as React from 'react';
import { Form, Input, Upload, Button, Radio, message, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor';
const { useState, memo, useCallback,useEffect } = React;
const { Option } = Select;
const { Item } = Form;
const FORM_LAYOUT_CONTENT = {
    labelCol: { span: 4 },
    wrapperCol: { span: 17 },
};

export interface CustomFormPropsType {
    type:string,
    name:string,
    desc:string,
    keywords:string,
    descrption:string,
    tag: Array<string>,
    readnum: number,
    experienceType: number,
    show: number,
    imgfile:string,
    experienceTypeInput: string,
    content:string
}

interface PropsType {
    onSubmit: Function,
    content?:CustomFormPropsType
}

function beforeUpload(file: any) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('仅支持 JPG/PNG 文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('文件必须小于 2MB!');
    }
    // return isJpgOrPng && isLt2M;
    return false; //自定义上传
}

const uploadButton = (
    <div>
        <PlusOutlined />
        <div className="ant-upload-text">Upload</div>
    </div>
);

//图片转为base64
function getBase64(img: any, callback: Function) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function CustomForm({ onSubmit ,content}: PropsType): React.ReactElement<any> {

    const onFinish = useCallback((values) => {
        onSubmit(values);
    }, [])

    const [files, setFiles] = useState(content?.imgfile);

    const [exfiles, setExFiles] = useState(content?.experienceTypeInput);

    const [selectHref, setSelectHref] = useState(true);

    const [form] = Form.useForm();

    useEffect(()=>{
        content?.imgfile && setFiles(content.imgfile);
        content?.experienceTypeInput && setExFiles(content.experienceTypeInput);
        content?.experienceType === 1 ? setSelectHref(true):setSelectHref(false);
    },[content])

    const handleChange = useCallback((file, type) => {
        getBase64(file.fileList[0].originFileObj, (src: string) => {
            // type === 1 ? setFiles(src) : setExFiles(src);
            //转化数据为base64
            if(type === 1){
                form.setFieldsValue({'imgfile':src});
                setFiles(src);
            }else{
                form.setFieldsValue({'experienceTypeInput':src});
                setExFiles(src);
            }
        })
    }, [])

    const handleRadioChange = useCallback((radio) => {
        radio.target.value === 1 ? setSelectHref(true):setSelectHref(false);
    }, [])

    return <Form {...FORM_LAYOUT_CONTENT} form={form} name="nest-messages" style={{ marginTop: 50 }} onFinish={onFinish}>
        <Item name={['type']} label="文章所属" initialValue={content?.type || 'lucy'} rules={[{ required: true, message: "必须选择文章所属" }]}>
            <Select style={{ width: 150 }}>
                <Option value="lucy">网站</Option>
                <Option value="Yiminghe">小程序/小游戏</Option>
                <Option value="w">日志记录</Option>
            </Select>
        </Item>
        <Item name={['name']} label="标题" initialValue={content?.name} rules={[{ required: true, message: "必须输入标题" }]}>
            <Input placeholder="请输入文章标题" />
        </Item>
        <Item name={['desc']} label="简介" initialValue={content?.desc} >
            <Input.TextArea rows={4} autoSize={false} placeholder="请输入描述内容"  style={{resize:'none'}}/>
        </Item>
        <Item name={['keywords']} label="关键词（seo）" initialValue={content?.keywords} rules={[{ required: true, message: "必须设置关键词" }]}>
            <Input placeholder="文章关键词" />
        </Item>
        <Item name={['descrption']} label="描述（seo）" initialValue={content?.descrption} rules={[{ required: true, message: "必须设置描述" }]} >
            <Input.TextArea rows={4} autoSize={false} placeholder="文章描述，用于seo"  style={{resize:'none'}}/>
        </Item>
        <Item name={['tag']} label="标签" initialValue={content?.tag?.join('|')} rules={[{ required: true, message: "至少设置一个标签" }]}>
            <Input placeholder="请输入标签，多个以 | 分割" />
        </Item>
        <Item name={['readnum']} label="阅读量" initialValue={content?.readnum}>
            <Input placeholder="设置阅读量" />
        </Item>
        <Item name={['imgfile']} label="封面图" initialValue={files}>
            <Upload
                listType="picture-card"
                // showUploadList={false} //不显示列表
                beforeUpload={beforeUpload}
                fileList={[]}
                onChange={(file) => handleChange(file, 1)}
            >
                {files ? <img src={files} style={{ width: '100%' }} /> : uploadButton}
            </Upload>
        </Item>
        <Item name={['experienceType']} label="体验类型选择" initialValue={content?.experienceType || 1}>
            <Radio.Group onChange={handleRadioChange}>
                <Radio value={1}>链接</Radio>
                <Radio value={2}>图片</Radio>
            </Radio.Group>
        </Item>
        <Item name={['experienceTypeInput']} label="体验类型输入" initialValue={content?.experienceTypeInput}>
            {selectHref ? <Input placeholder="请输入链接地址" /> :
                <Upload
                    listType="picture-card"
                    showUploadList={false}
                    fileList={[]}
                    beforeUpload={beforeUpload}
                    onChange={(file) => handleChange(file, 2)}
                >
                    {exfiles ? <img src={exfiles} style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            }
        </Item>
        <Item name={['show']} label="是否上架" initialValue={content?.show || 0}>
            <Radio.Group>
                <Radio value={0}>是</Radio>
                <Radio value={1}>否</Radio>
            </Radio.Group>
        </Item>
        <Item name={['content']} label="内容" rules={[{ required: true, message: "请输入内容" }]} initialValue={BraftEditor.createEditorState(content?.content)}>
            <BraftEditor
                placeholder="请输入具体内容"
                style={{ border: '1px solid #d9d9d9' }}
            />
        </Item>
        <Item wrapperCol={{ span: 24 }} style={{ textAlign: "center", marginTop: 50 }}>
            <Button htmlType="submit" type="primary" size="large" style={{ width: 200 }}>保存</Button>
        </Item>
    </Form >
}

export default memo(CustomForm);