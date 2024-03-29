// 引入 createStore,专门用于创建redux中最核心的store对象
import { legacy_createStore as createStore, combineReducers, Store, compose, applyMiddleware } from "redux";
import storage from "redux-persist/lib/storage";
import { persistStore, persistReducer } from "redux-persist";
import reduxThunk from "redux-thunk";
import reduxPromise from "redux-promise";
import global from "./modules/global/reducer";
import menu from "./modules/menu/reducer";
import tabs from "./modules/tabs/reducer";
import auth from "./modules/auth/reducer";
import breadcrumb from "./modules/breadcrumb/reducer";

/**
 * redux 创建reducer
 * 可以使用单独的一个 reducer，也可以将多个reducer合并为一个 reducer，即 combineReducers。
 */
// 合并多个reducer函数
const reducer = combineReducers({
	global,
	menu,
	tabs,
	auth,
	breadcrumb
});

// redux 持久化配置
const persistConfig = {
	key: "redux-state",
	storage: storage, // 缓存机制
	// blacklist: ['name','age'] // reducer 里不持久化的数据，除此外均为持久化数据（黑名单）
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// 开启 redux-devtools（window的方法）
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 使用 redux 中间件（安装中间件 applyMiddleware(thunk)）
const middleWares = applyMiddleware(reduxThunk, reduxPromise);

// 创建 store
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares));

// 创建持久化 store
const persistor = persistStore(store);

export { store, persistor };
