import * as React from 'react';
import { Button, Table, Tag, Popconfirm, message } from 'antd';
const { memo, useCallback, useState } = React;

function cancelHandle(): void {
    console.log('取消');

}
function confirmHandle(): void {
    console.log('删除');

}
//关于我们
function Apply(): React.ReactElement<any> {
    const [saveLoading, setSaveLoading] = useState(false);

    const dataSource = [
        {
            key: '1',
            name: '胡彦斌',
            contact: 123456,
            type: '1',
            desc: '如何验证文本框中的内容是否为数字，本文提供了三种方法，希望对大家的学习有所启发。在某些情况下可能需要让文本框中的内容只能够输入数字，例如手机号码或者邮编之类的，下面简单介绍一下如何实现此功能。',
            money: '10000',
            state: 0,
            time: '2',
        },
        {
            key: '2',
            name: '胡彦斌',
            contact: 123456,
            type: '1',
            desc: '如何验证文本框中的内容是否为数字，本文提供了三种方法，希望对大家的学习有所启发。在某些情况下可能需要让文本框中的内容只能够输入数字，例如手机号码或者邮编之类的，下面简单介绍一下如何实现此功能。',
            money: '10000',
            state: 1,
            time: '2',
        },
        {
            key: '3',
            name: '胡彦斌',
            contact: 123456,
            type: '1',
            state: 2,
            desc: '如何验证文本框中的内容是否为数字，本文提供了三种方法，希望对大家的学习有所启发。在某些情况下可能需要让文本框中的内容只能够输入数字，例如手机号码或者邮编之类的，下面简单介绍一下如何实现此功能。',
            money: '10000',
            time: '2',
        },
        {
            key: '4',
            name: '胡彦斌',
            contact: 123456,
            type: '1',
            state: 3,
            desc: '如何验证文本框中的内容是否为数字，本文提供了三种方法，希望对大家的学习有所启发。在某些情况下可能需要让文本框中的内容只能够输入数字，例如手机号码或者邮编之类的，下面简单介绍一下如何实现此功能。',
            money: '10000',
            time: '2',
        },

    ];

    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (record: any, text: any, index: number) => (index + 1)
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '联系方式',
            dataIndex: 'contact',
            key: 'contact',
        },
        {
            title: '需求类型',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: '需求简介',
            dataIndex: 'desc',
            width: 500,
            key: 'desc',
        },
        {
            title: '状态',
            dataIndex: 'state',
            key: 'state',
            render: (state: number) => {
                if (state === 0) {
                    return <Tag color="#f50" key={state} >
                        {'审核中'}
                    </Tag >
                } else if (state === 1) {
                    return <Tag color="#87d068" key={state} >
                        {'制作中'}
                    </Tag >
                } else if (state === 2) {
                    return <Tag color="#2db7f5" key={state} >
                        {'维护中'}
                    </Tag >
                } else {
                    return <Tag color="#878685" key={state} >
                        {'已完成'}
                    </Tag >
                }

            }
        },
        {
            title: '需求预算',
            dataIndex: 'money',
            key: 'money',
            render: (record: any, text: any, index: number) => text.money + '元'
        },
        {
            title: '周期',
            dataIndex: 'time',
            key: 'time',
            render: (record: any, text: any, index: number) => text.time + '周'
        },
        {
            title: '操作',
            dataIndex: 'method',
            key: 'method',
            render: (record: any, text: any, index: number) => {
                if (text.state === 0)
                    return <Button type="primary">审核</Button>
                else if (text.state === 1)
                    return <Popconfirm
                        title="您确定要将状态更改为维护中吗?"
                        onConfirm={confirmHandle}
                        onCancel={cancelHandle}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="danger">
                            维护
                </Button>
                    </Popconfirm>
                else if (text.state === 2)
                    return <Popconfirm
                        title="您确定要将状态更改为已完成吗?"
                        onConfirm={confirmHandle}
                        onCancel={cancelHandle}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="primary">
                            完成
                        </Button>
                    </Popconfirm>
                else
                return '已结束'
            }
        },
    ];
    return <Table dataSource={dataSource} bordered columns={columns} />;
}

export default memo(Apply);