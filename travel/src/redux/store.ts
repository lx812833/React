import { createStore } from "redux";
import languageRedux from "./language/languageRedux";

const store = createStore(languageRedux);

export default store;