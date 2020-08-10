

import * as React from 'react';
import 'braft-extensions/dist/table.css';
import 'braft-extensions/dist/code-highlighter.css';
import 'braft-extensions/dist/color-picker.css'
import { Upload, message } from 'antd';
import { FolderAddOutlined } from '@ant-design/icons';
import BraftEditor from 'braft-editor';
import { ContentUtils } from 'braft-utils';
import { ImageUtils } from 'braft-finder'
import uploadFile from '../../utils/uploadFile';
import { USER_TOKEN_NAME, REQUEST_SUCCESS } from '../../config/config';
import { UPLOAD_FILR_API } from '../../config/api.config';
import Table from 'braft-extensions/dist/table';
import Markdown from 'braft-extensions/dist/markdown';
import CodeHighlighter from 'braft-extensions/dist/code-highlighter';
import ColorPicker from 'braft-extensions/dist/color-picker'
import HeaderId from 'braft-extensions/dist/header-id'

const { memo, useCallback, useEffect } = React;

interface PropsType {
    editorState: any,
    setEditorState: Function,
    defaultValue?: string,
    disabled?: boolean
}

//表格扩展
BraftEditor.use(Table({
    includeEditors: ['editor'],
    columnResizable: true,
    withDropdown: true,
    defaultColumns: 4,
    defaultRows: 4
}))

//markdown文本
BraftEditor.use(Markdown({
    includeEditors: ['editor']
}))

//代码高亮
BraftEditor.use(CodeHighlighter({
    includeEditors: ['editor']
}))

//高级取色器
BraftEditor.use(ColorPicker({
    includeEditors: ['editor']
}))

//标题
BraftEditor.use(HeaderId({
    includeEditors: ['editor']
}))

function BraftEditorCustom({ editorState, setEditorState, defaultValue, disabled }: PropsType): React.ReactElement<any> {
    useEffect(() => {
        // if (!editorState)
        setEditorState(() => BraftEditor.createEditorState(defaultValue));
    }, [defaultValue])
    //自定义文件上传
    const uploadHandler = useCallback(async (params: any) => {
        if (!params.file) {
            return false
        }
        let response: any = await uploadFile(params.file, UPLOAD_FILR_API, localStorage.getItem(USER_TOKEN_NAME));
        if (response.statusCode == REQUEST_SUCCESS) {
            message.success('上传成功');
            setEditorState(ContentUtils.insertMedias(editorState, [{
                type: 'IMAGE',
                url: response.addDatas.resultlist[0]
            }]));
        } else {
            message.error('上传失败')
        }
    }, [editorState])
    //自定义控件按钮
    const extendControls: Array<any> = [
        {
            key: 'antd-uploader',
            type: 'component',
            component: (
                <Upload
                    accept="image/*"
                    showUploadList={false}
                    customRequest={uploadHandler}
                >
                    <div data-title={'上传文件'} className="control-item button upload-button" style={{ lineHeight: '36px', textAlign: 'center' }}>
                        <FolderAddOutlined />
                    </div>
                </Upload>
            )
        }
    ]

    return <BraftEditor
        id="editor"
        value={editorState}
        readOnly={disabled}
        onChange={es => setEditorState(es)}
        extendControls={extendControls}
        placeholder="请输入具体内容"
        style={{ border: '1px solid #d9d9d9' }}
    />

}

export default memo(BraftEditorCustom);