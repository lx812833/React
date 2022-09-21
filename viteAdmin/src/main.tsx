import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { Provider } from "react-redux";
import { store, persistor } from "@/redux";
import { PersistGate } from "redux-persist/integration/react";
import "@/language/index";
import "@/styles/common.less";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode >
)
