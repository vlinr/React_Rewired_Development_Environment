
## 技术栈
react<br />
react-dom<br />
react-app-rewired<br />
redux<br />
react-redux<br />
redux-saga<br />
react-router<br />
less<br />
antd<br />
g2<br />
mock<br />
lodash-es<br />
reselect<br />
<!-- immutable -->
fetch<br />
typescript...

## 目录结构
>>>>--| public  ---- 存放一些公用文件<br />
>>>>--| src<br />
>>>>>>--| actions  ----redux action<br />
>>>>>>--| components  ---- 组件存放位置<br />
>>>>>>--| config  ---- 配置文件夹,包括路由配置,全局变量配置,请求api配置<br />
>>>>>>--| constants  ----redux type<br />
>>>>>>--| layouts  ---- 布局文件夹<br />
>>>>>>--| mocker  ---- Mock api<br />
>>>>>>--| pages  ---- 页面资源<br />
>>>>>>--| reducers  ---- redux reducer<br />
>>>>>>--| request  ---- fecth请求<br />
>>>>>>--| routers  ---- 路由自定义渲染,无需过多的更改<br />
>>>>>>--| sagas  ---- redux saga<br />

### yarn

安装依赖包

### `yarn start`

启动项目,开发环境启动

### `yarn mocker`

Mock方式启动,启动后将使用本地src下面的mocker文件夹下的api

### `yarn test`

测试

### `yarn build`

打包项目

### `yarn global add electron | npm install -g electron & electron .`

全局安装electron,安装完成后,使用 `electron . `启动桌面环境开发,当然必须先启动项目后,在进行启动桌面环境

### `yarn eject`

**慎用**
