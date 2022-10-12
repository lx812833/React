import { useState } from "react";
import { connect } from "react-redux";
import { Drawer, Divider, Switch } from "antd";
import SwitchDark from "@/components/SwitchDark";
import { updateCollapse } from "@/redux/modules/menu/action";
import { setThemeConfig } from "@/redux/modules/global/action";
import { FireOutlined, SettingOutlined } from "@ant-design/icons";

const Theme = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false);
  const { isCollapse } = props.menu;
  const { themeConfig } = props.global;
  const { setThemeConfig, updateCollapse } = props;
  const { weakOrGray, breadcrumb, tabs, footer } = themeConfig;

  const setWeakOrGray = (checked: boolean, theme: string) => {
    if (checked) {
      // 需使用浅拷贝更新 state
      return setThemeConfig({ ...themeConfig, weakOrGray: theme });
    }
    setThemeConfig({ ...themeConfig, weakOrGray: "" });
  };

  const onChange = (checked: boolean, keyName: string) => {
    return setThemeConfig({ ...themeConfig, [keyName]: !checked });
  };

  return (
    <>
      <i className="icon-style iconfont icon-zhuti" onClick={() => { setVisible(true) }}></i>

      <Drawer title="布局设置" visible={visible} closable={false} width={320} onClose={() => {
        setVisible(false);
      }}>
        {/* 全局主题 */}
        <Divider className="divider">
          <FireOutlined />
          全局主题
        </Divider>
        <div className="theme-item">
          <span>暗黑模式</span>
          <SwitchDark />
        </div>
        <div className="theme-item">
          <span>灰色模式</span>
          <Switch
            checked={weakOrGray === "gray"}
            onChange={e => {
              setWeakOrGray(e, "gray");
            }}
          />
        </div>
        <div className="theme-item">
          <span>色弱模式</span>
          <Switch
            checked={weakOrGray === "weak"}
            onChange={e => {
              setWeakOrGray(e, "weak");
            }}
          />
        </div>

        <br />

        {/* 界面设置 */}
        <Divider className="divider">
          <SettingOutlined />
          界面设置
        </Divider>
        <div className="theme-item">
          <span>折叠菜单</span>
          <Switch
            checked={isCollapse}
            onChange={e => {
              updateCollapse(e);
            }}
          />
        </div>
        <div className="theme-item">
          <span>面包屑导航</span>
          <Switch
            checked={!breadcrumb}
            onChange={e => {
              onChange(e, "breadcrumb");
            }}
          />
        </div>
        <div className="theme-item">
          <span>标签栏</span>
          <Switch
            checked={!tabs}
            onChange={e => {
              onChange(e, "tabs");
            }}
          />
        </div>
        <div className="theme-item">
          <span>页脚</span>
          <Switch
            checked={!footer}
            onChange={e => {
              onChange(e, "footer");
            }}
          />
        </div>
      </Drawer>
    </>
  )
}

/**
 * react-redux 核心方法
 * 
 * connect：connect 用于连接 UI 组件与 redux，使用 connect()() 创建并暴露一个 Count 的容器组件
 * mapStateToProps：意译为“把 state 映射到 props 中去”，其实也就是把 Redux 中的数据映射到 React 中的props中去。
 * mapDispatchToProps：把各种 dispatch 变成了 props，在组件中可以直接使用。
 */

const mapStateToProps = (state: any) => state;
const mapDispatchToProps = { setThemeConfig, updateCollapse };
export default connect(mapStateToProps, mapDispatchToProps)(Theme);