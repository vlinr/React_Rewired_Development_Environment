import * as React from 'react';


function Layout1(props: any) {
    const { children } = props;
    console.log(children)
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