import * as React from 'react';


interface PropsType {
    children:React.ReactNode | string | React.ReactElement
}

function Layout1(props: PropsType):React.ReactNode {
    const { children } = props;
    return (
        <>
            <div className="left">
                1111
        </div>
            <div className="right">
                {children}
        </div>
        </>
    );
}

export default Layout1;