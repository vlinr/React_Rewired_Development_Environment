import {combineReducers} from 'redux';

//整合所有的reducer
export const makeAllReducer = (asyncReducers:any) => combineReducers({
    ...asyncReducers
}); 

//注入reducer
export const injectReducer = (store:any, { key, reducer}:any) => {
    if (Object.hasOwnProperty.call(store.asyncReducers, key)) return;
    store.asyncReducers[key] = reducer;
    store.replaceReducer(makeAllReducer(store.asyncReducers));
}

//创建reducer
export const createReducer = (initialState:any, ACTION_HANDLES:any) => (
    (state = initialState, action:any) => {
        const handler = ACTION_HANDLES[action.type];
        return handler ? handler(state, action) : state;
    }
);