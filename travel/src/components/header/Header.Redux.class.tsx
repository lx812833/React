import React from "react";
import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { LanguageState } from "../../redux/language/languageRedux";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import store from "../../redux/store";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";
import { withTranslation, WithTranslation } from "react-i18next";

interface State extends LanguageState { }

class HeaderComponnet extends React.Component<RouteComponentProps & WithTranslation, State> {
  constructor(props: any) {
    super(props);
    const storeState = store.getState();
    this.state = {
      language: storeState.language,
      languageList: storeState.languageList
    }
    // 订阅
    store.subscribe(this.handleStoreChange)
  }

  handleStoreChange = () => {
    const storeState = store.getState();
    this.setState({
      language: storeState.language
    })
  }
  // 切换语言
  handleChangeLanguage = (e: any) => {
    const action = changeLanguageActionCreator(e.key);
    store.dispatch(action);
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
                  this.state?.languageList.map(item => {
                    return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                  })
                }
              </Menu>
            }
              icon={<GlobalOutlined />}
            >
              {this.state?.language === "zh" ? "中文" : "English"}
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

export const Header = withTranslation()(withRouter(HeaderComponnet));