import React from "react";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// 错误页面模块
const errorRouter: Array<RouteObject> = [
  {
    path: "/403",
    element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
    meta: {
      requiresAuth: true,
      title: "403页面",
      key: "403"
    }
  }
]

export default errorRouter;