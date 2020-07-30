import * as React from 'react';
import './index.less';
const { memo } = React;

export interface PropsType {
    name: String | React.ReactNode
}

function Ball({ name }: PropsType): React.ReactElement<PropsType> {
    return <>
        <div className="wrap">
            <div className="inner"></div>
            <div className="x">
                <div className="y"></div>
                <div className="z"></div>
            </div>
        </div>
    </>
}


//或者
// const Ball:React.FC<PropsType> = ({name}:PropsType)=>{
//     return <>
//     <span className="span">
//         {name}
//     </span>
// </>
// }

export default memo(Ball);