import * as React from 'react';
import styles from './edit.module.less';
import CustomForm from '../../components/CustomForm';
const { memo, useCallback } = React;

//编辑页面
function NewContent(): React.ReactElement<any> {

    const onFinish = useCallback((values) => {
        console.log(values);
        console.log(values.content.toRAW(),values.content.toHTML())
    }, [])

    return <div className={styles.box}>
        <CustomForm onSubmit={onFinish}  />
    </div>
}


export default memo(NewContent);