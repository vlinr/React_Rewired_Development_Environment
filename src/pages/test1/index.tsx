import * as React from 'react';
import './index.less';
import Ball from '../../components/Ball';
const memo = React.memo;

function TestPage1() {

    return <div className="test">
        <Ball name={`Electron`} />
    </div>
}

export default memo(TestPage1);