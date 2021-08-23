import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { changeLanguageActionCreator } from '../../redux/language/languageActions';
import { RootState } from "../../redux/store";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

const mapStateToProps = (state: RootState) => {
  return {
    language: state.language,
    languageList: state.languageList
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    handleChangeLanguage: (code: "zh" | "en") => {
      const action = changeLanguageActionCreator(code);
      dispatch(action);
    }
  }
}

type PropsType = RouteComponentProps & // react-router 路由props类型
WithTranslation & // i18n props类型
ReturnType<typeof mapStateToProps> & // redux store 映射类型
ReturnType<typeof mapDispatchToProps> // redux dispatch 映射类型

class HeaderComponnet extends React.Component<PropsType> {
  // 切换语言
  handleChangeLanguage = (e: any) => {
    this.props.handleChangeLanguage(e.key);
  };

  render() {
    const { history, t } = this.props;
    const menuList = [
      { id: 1, label: t("header.home_page") },
      { id: 2, label: t("header.weekend") },
      { id: 3, label: t("header.group") },
      { id: 4, label: t("header.backpack") },
      { id: 5, label: t("header.private") },
      { id: 6, label: t("header.cruise") },
      { id: 7, label: t("header.hotel") },
      { id: 8, label: t("header.local") },
      { id: 9, label: t("header.theme") },
      { id: 10, label: t("header.custom") },
      { id: 11, label: t("header.study") },
      { id: 12, label: t("header.visa") },
      { id: 13, label: t("header.enterprise") },
      { id: 14, label: t("header.high_end") },
      { id: 15, label: t("header.outdoor") },
      { id: 16, label: t("header.insurance") }
    ]
    return (
      <div className={styles['app-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>{t("header.slogan")}</Typography.Text>
            <Dropdown.Button style={{ marginLeft: 15 }} overlay={
              <Menu onClick={this.handleChangeLanguage}>
                {
                  this.props?.languageList.map(item => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  })
                }
              </Menu>
            }
              icon={<GlobalOutlined />}
            >
              {this.props?.language === "zh" ? "中文" : "English"}
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button onClick={() => history.push("register")}>注册</Button>
              <Button onClick={() => history.push("signIn")}>登录</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <span onClick={() => history.push("/")}>
            <img src={logo} alt="logo" className={styles['app-logo']} />
            <Typography.Title level={3} className={styles.title}>
              React 旅游网
            </Typography.Title>
          </span>
          <Input.Search placeholder="请输入旅游目的地、主题或关键字" className={styles['search-input']} />
        </Layout.Header>
        <Menu mode="horizontal" className={styles['main-menu']}>
          {
            menuList.map(item =>
              <Menu.Item key={item.id}>{item.label}</Menu.Item>
            )
          }
        </Menu>
      </div>
    )
  }
}

// 使用connect连接store
export const Header = connect(mapStateToProps, mapDispatchToProps)(
  withTranslation()(withRouter(HeaderComponnet))
);
