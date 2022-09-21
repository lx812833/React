import { Switch } from "antd";
import { connect } from "react-redux";
import { setThemeConfig } from "@/redux/modules/global/action";

const SwitchDark = (props: any) => {
  const { setThemeConfig, themeConfig } = props;
  const onChange = (checked: boolean) => {
    setThemeConfig({ ...themeConfig, isDark: checked });
  }

  return (
    <Switch
      className="dark"
      defaultChecked={themeConfig.isDark}
      checkedChildren={<>🌞</>}
      unCheckedChildren={<>🌜</>}
      onChange={onChange}
    />
  )
}

/**
 * react-redux 核心方法
 * 
 * connect：connect 用于连接 UI 组件与 redux，使用 connect()() 创建并暴露一个 Count 的容器组件
 * mapStateToProps：意译为“把 state 映射到 props 中去”，其实也就是把 Redux 中的数据映射到 React 中的props中去。
 * mapDispatchToProps：把各种 dispatch 变成了 props，在组件中可以直接使用。
 */

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setThemeConfig };
export default connect(mapStateToProps, mapDispatchToProps)(SwitchDark);