import * as React from 'react';
import styles from './edit.module.less';
import CustomForm,{CustomFormPropsType} from '../../components/CustomForm';
const { memo, useCallback } = React;

const DATA:CustomFormPropsType = {
    type: 'Yiminghe',
    name: '全民套圈圈微信小游戏',
    desc: '全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏',
    keywords: '全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏',
    descrption: '全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏',
    tag: [
        '小游戏',
        '自研'
    ],
    readnum: 999,
    experienceType: 2,
    // experienceTypeInput: 'https://www.this1.cn/',
    show: 0,
    imgfile:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    experienceTypeInput: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    content: `<p>这里是内容，哈哈哈哈哈，我我我我我我全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏全民套圈圈微信小游戏</p>`
}

//编辑页面
function EditContent(): React.ReactElement<any> {

    const onFinish = useCallback((values) => {
        console.log(values);
        console.log(values.content.toRAW(), values.content.toHTML())
    }, [])

    return <div className={styles.box}>
        <CustomForm onSubmit={onFinish} content={DATA} />
    </div>
}


export default memo(EditContent);