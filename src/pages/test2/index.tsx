import * as React from 'react';
import './index.less';
import Ball from '../../components/Ball';
const memo = React.memo;

function TestPage2(): React.ReactElement<any> {
    return <div className="test">
        <Ball name={`React`} />
    </div>
}
export default memo(TestPage2);