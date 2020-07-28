import * as React from 'react';
import './index.less';
const { memo } = React;

export interface PropsType {
    name: String | React.ReactNode
}

function Ball({ name }: PropsType):React.ReactElement<PropsType> {
    return <>
        <span className="span">
            {name}
        </span>
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