import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/login";
import { RouteObject } from "./interface";

// 导入所有路由
const metaRouters = import.meta.globEager("./modules/*.tsx");
console.log("metaRouters", metaRouters);

// 处理路由
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
  console.log("处理路由", item);
  Object.keys(metaRouters[item]).forEach((key: any) => {
    routerArray.push(...metaRouters[item][key]);
  })
})

export const rootRouter: RouteObject[] = [
  {
    path: "/",
    element: <Navigate to="/login" />
  },
  {
    path: "/login",
    element: <Login />,
    meta: {
      requiresAuth: false,
      title: "登录页",
      key: "login"
    }
  },
  ...routerArray,
  {
    path: "*",
    element: <Navigate to="/404" />
  }
];

const Router = () => {
  const routes = useRoutes(rootRouter);
  return routes;
}

export default Router;