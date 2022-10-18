import * as types from "@/redux/mutation-types";

// * setTabsList
export const setTabsList = (tabsList: Menu.MenuOptions[]) => ({
	type: types.SET_TABS_LIST,
	tabsList
});