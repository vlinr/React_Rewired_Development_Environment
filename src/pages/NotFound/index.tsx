import React, { memo } from 'react';
import {Result} from 'antd';
import {Link} from 'react-router-dom';
//404页面
function NotFound(): React.ReactElement {
    return <Result
    status="404"
    title="404"
    subTitle="对不起，您所访问的页面不存在."
    extra={
        <Link to="/">返回首页</Link>
    } />
}

export default memo(NotFound);