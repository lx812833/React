import { createStore } from "redux";
import languageRedux from "./language/languageRedux";

const store = createStore(languageRedux);

export type RootState = ReturnType<typeof store.getState>;

export default store;