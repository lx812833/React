import { connect } from "react-redux";
import { updateCollapse } from "@/redux/modules/menu/action";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const CollapseIcon = (props: any) => {
  const { isCollapse, updateCollapse } = props;
  return (
    <div className="collapsed" onClick={() => { updateCollapse(!isCollapse); }}>
      {isCollapse ? <MenuUnfoldOutlined id="isCollapse" /> : <MenuFoldOutlined id="isCollapse" />}
    </div>
  );
};

/**
 * react-redux 核心方法
 * 
 * connect：connect 用于连接 UI 组件与 redux，使用 connect()() 创建并暴露一个 Count 的容器组件
 * mapStateToProps：意译为“把 state 映射到 props 中去”，其实也就是把 Redux 中的数据映射到 React 中的props中去。
 * mapDispatchToProps：把各种 dispatch 变成了 props，在组件中可以直接使用。
 */

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(CollapseIcon);
