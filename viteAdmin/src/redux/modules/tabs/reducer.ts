import { AnyAction } from "redux";
import { TabsState } from "@/redux/interface";
import { HOME_URL } from "@/config/config";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const tabsState: TabsState = {
	tabsList: [{ title: "首页", path: HOME_URL }]
};

// Immer 解决了什么问题？
// 解决了在 React 当中强调的不可变数据 (immutable) 的性能问题，可以不使用深拷贝 这样浪费性能的操作来完成这一过程。
// Immer 原理：Immer 通过 递归式的 proxy 对象代理 和 浅拷贝，提高了不可变数据的性能，尽可能的复用数据结构当中其他节点的内存。既满足了性能要求，又使得数据达到了不可变数据的要求。

// tabs reducer
const tabs = (state: TabsState = tabsState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_TABS_LIST:
				draftState.tabsList = action.tabsList;
				break;
			default:
				return draftState;
		}
	});

export default tabs;
