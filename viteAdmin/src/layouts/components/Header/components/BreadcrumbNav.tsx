import { Breadcrumb } from "antd";
import { connect } from "react-redux";
import { HOME_URL } from "@/config/config";
import { useLocation } from "react-router-dom";

/**
 * @param useLocation 
 * react-router 对 window.location 进行包装后，提供了一个形式简洁的Location对象，形如：
 * {
 *    pathname: "/bbq/pig-pickins",     // 主机名之后的URL地址
 *    search: "?campaign=instagram",    // 查询参数
 *    hash: "#menu",                    // 哈希值，用于确定页面滚动的具体位置
 *    state: null,                      // 对于 window.history.state 的包装
 *    key: "aefz24ie"                   // 
 * }
 */

const BreadcrumbNav = (props: any) => {
  const { pathname } = useLocation();
  const { themeConfig } = props.global;
  const breadcrumbList = props.breadcrumb.breadcrumbList[pathname] || [];

  return (
    <>
      {!themeConfig.breadcrumb && (
        <Breadcrumb>
          <Breadcrumb.Item href={`#${HOME_URL}`}>首页</Breadcrumb.Item>
          {breadcrumbList.map((item: string) => {
            return <Breadcrumb.Item key={item}>{item !== "首页" ? item : null}</Breadcrumb.Item>;
          })}
        </Breadcrumb>
      )}
    </>
  )
}


/**
 * react-redux 核心方法
 * 
 * connect：connect 用于连接 UI 组件与 redux，使用 connect()() 创建并暴露一个 Count 的容器组件
 * mapStateToProps：意译为“把 state 映射到 props 中去”，其实也就是把 Redux 中的数据映射到 React 中的props中去。
 */
const mapStateToProps = (state: any) => state;
export default connect(mapStateToProps)(BreadcrumbNav);