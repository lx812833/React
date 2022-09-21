import { Layout } from "antd";
import { connect } from "react-redux";
import { Outlet } from "react-router-dom"; // 嵌套路由，可以保证子路由共享父路由的界面而不会覆盖
import LayoutMenu from "./components/Menu";
import LayoutHeader from "./components/Header";
import LayoutTabs from "./components/Tabs";
import LayoutFooter from "./components/Footer";
import "./index.less";

const LayoutIndex = (props: any) => {
  const { Sider, Content } = Layout;

  return (
    <section className="container">
      <Sider trigger={null} collapsed={props.isCollapse} width={220} theme="dark">
        <LayoutMenu></LayoutMenu>
      </Sider>
      <Layout>
        <LayoutHeader></LayoutHeader>
        <LayoutTabs></LayoutTabs>
        <Content>
          <Outlet></Outlet>
        </Content>
        <LayoutFooter></LayoutFooter>
      </Layout>
    </section>
  )
}

const mapStateToProps = (state: any) => state.menu;
// const mapDispatchToProps = { setAuthButtons, updateCollapse };
export default connect(mapStateToProps)(LayoutIndex);