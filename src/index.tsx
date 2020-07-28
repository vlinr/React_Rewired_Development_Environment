import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import App from './App';
// import { ConfigProvider } from 'antd';
//引入saga中间件
import createSagaMiddleware from 'redux-saga';
//引入reducer和saga
import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  // <ConfigProvider locale={zhCN}> //antd国际化配置
    <Provider store={store}>
      <App />
    </Provider>
  // </ConfigProvider>,
  ,
  document.getElementById('root')
);
