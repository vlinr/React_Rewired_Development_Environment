import Mock from 'mockjs';
export default Mock.mock('/login', 'get', function () {
    console.log('执行了')
    const data = {
        'code': '0',
        'msg': '登录成功',
        'result': {
            'name': 'Keen_pro',
            "headUrl": '',
            'userType': 'admin',
            'token|3': /\d{5,10}\-/
        }
    }
    return data;
})
