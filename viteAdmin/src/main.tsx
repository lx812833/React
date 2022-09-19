import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/language/index";
import "@/styles/common.less";
import "@/styles/reset.less";
import "@/assets/iconfont/iconfont.less";
import "@/assets/fonts/font.less";
import "antd/dist/antd.less";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
