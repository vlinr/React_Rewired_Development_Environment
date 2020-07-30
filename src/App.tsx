// import * as React from 'react';

import './App.less';
import { hot } from 'react-hot-loader/root';
import AppRouter from './routers/index';
//使用redux,hooks
// import { useDispatch, useSelector } from 'react-redux';

// import { createSelector } from 'reselect'; //使用数据仓库的内容

// import { StoreType } from './reducers/test';

//引入action
// import { reduxTest } from './actions/test';

//取到数据仓库的store下的data
// const reducerStore = createSelector(
//   (state: any) => state.testReducer,
//   (testReducer: StoreType) => testReducer.data
// );

function App() {
  //创建一个变量执行store.data
  // const reduxData = useSelector(reducerStore);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(reduxTest('我是改变的值')); //发起更改
  // }, [])
  return AppRouter;
}


{/* <Router>
      <Switch>
        <Route exact path={`/`} component={TestPage} />  
        <Route exact path={`/login`} component={TestPage} />
        <Layout>
          <Switch>
            重写路由处理器，书写Render方法
            <Route exact path={`/dashboard`} component={TestPage} />
            <Route exact path={`/permission`} component={TestPage} />
            <Route component={NotFound} />
          </Switch>
        </Layout>
      </Switch>
    </Router> */}

//热更新
const AppHot = process.env.NODE_ENV === 'development' ? hot(App) : App
export default AppHot;
