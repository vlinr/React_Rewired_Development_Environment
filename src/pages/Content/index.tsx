import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { Popconfirm, Tag, Button, Table, Select } from 'antd';
import filters from './filter.module.less';
const { memo, useCallback } = React;
const { Option } = Select;

//筛选
function handleChange(value: string): void {
    console.log(`selected ${value}`);
}

//过滤器
function Filter(): React.ReactElement<any> {
    return <div className={filters.filter}>
        <span>筛选：</span>
        <Select defaultValue="jack" style={{ width: 150 }} onChange={handleChange}>
            <Option value="jack">全部</Option>
            <Option value="lucy">网站</Option>
            <Option value="Yiminghe">小程序/小游戏</Option>
            <Option value="w">日志记录</Option>
        </Select>
    </div>
}

const dataSource = [
    {
        key: '1',
        title: '这是title',
        tag: ['外包', '小程序'],
        readNum: '9999',
        desc: '这是描述的内容',
    },
    {
        key: '2',
        title: '这是title',
        tag: ['外包', '小程序'],
        readNum: '9999',
        desc: '这是描述的内容',
    },
];

const TAG_COLORS: Array<string> = ['magenta', 'volcano', 'red', 'orange', 'gold', 'lime', 'lime']

//这里是首页，内容管理
function Content(): React.ReactElement<any> {
    const history = useHistory();
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            key: 'index',
            render: (record: any, item: any, index: number) => {
                return index < 9 ? '0' + (index + 1) : index
            }
        },
        {
            title: '标题',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: '类型',
            dataIndex: 'tag',
            key: 'tag',
            render: (tag: Array<string>) => (
                <>
                    {tag.map((tag: string, index: number) => {
                        return (
                            <Tag color={TAG_COLORS[index]} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            )
        },
        {
            title: '阅读人数',
            dataIndex: 'readNum',
            key: 'readNum',
        },
        {
            title: '描述',
            dataIndex: 'desc',
            key: 'desc',
        },
        {
            title: '操作',
            dataIndex: 'method',
            key: 'method',
            width: 180,
            render: (record: any, item: any, index: number) => {
                return <>
                    <Button type="primary" style={{ marginRight: 15 }} onClick={() => editHandle()}>编辑</Button>
                    <Popconfirm
                        title="您确定要删除这条数据吗?"
                        onConfirm={confirmHandle}
                        onCancel={cancelHandle}
                        okText="确定"
                        cancelText="取消"
                    >
                        <Button type="danger">
                            删除
                    </Button>
                    </Popconfirm>
                </>
            }
        },
    ];
    //编辑
    const editHandle = useCallback(
        (): void => {
            history.push('/editContent');
            console.log('编辑', history);
        },
        [],
    )
    const cancelHandle = useCallback(
        (): void => {
            console.log('取消');
        },
        [],
    )
    const confirmHandle = useCallback(
        (): void => {
            console.log('删除');
        },
        [],
    )

    return <div>
        <Filter />
        <Table bordered dataSource={dataSource} columns={columns} />;
    </div>
}

export default memo(Content);