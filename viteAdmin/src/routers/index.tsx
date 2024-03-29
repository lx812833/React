import { Navigate, useRoutes } from "react-router-dom";
import Login from "@/views/login";
import { RouteObject } from "./interface";

/**
 * vite import.meta.globEager实现自动化引入及处理路由
 */

const metaRouters = import.meta.globEager("./modules/*.tsx");
export const routerArray: RouteObject[] = [];
Object.keys(metaRouters).forEach(item => {
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