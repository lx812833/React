import { RouteObject } from "@/routers/interface";
import { LayoutIndex } from "@/routers/constant";
import Home from "@/views/home";

// 首页模块
const homeRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    children: [
      {
        path: "/home/index",
        element: <Home />,
        meta: {
          requiresAuth: true,
          title: "首页",
          key: "home"
        }
      }
    ]
  }
];

export default homeRouter;