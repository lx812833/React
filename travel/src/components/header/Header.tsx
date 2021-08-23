import { GlobalOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Layout, Menu, Typography } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "../../redux/hooks";
import { changeLanguageActionCreator } from "../../redux/language/languageActions";
import { useTranslation } from "react-i18next";
import logo from "../../assets/logo.svg";
import styles from "./Header.module.css";

export const Header = () => {
  const history = useHistory();
  const language = useSelector((state) => state.language);
  const languageList = useSelector((state) => state.languageList);
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  // 切换语言
  const handleChangeLanguage = ({ key }: any) => {
    dispatch(changeLanguageActionCreator(key));
  }
  return (
    <div className={styles['app-header']}>
      <div className={styles['top-header']}>
        <div className={styles.inner}>
          <Typography.Text>{t("header.slogan")}</Typography.Text>
          <Dropdown.Button style={{ marginLeft: 15 }} overlay={
            <Menu onClick={handleChangeLanguage}>
              {
                languageList?.map(item => {
                  return <Menu.Item key={item.code}>{item.name}</Menu.Item>
                })
              }
            </Menu>
          }
            icon={<GlobalOutlined />}
          >
            {language === "zh" ? "中文" : "English"}
          </Dropdown.Button>
          <Button.Group className={styles['button-group']}>
            <Button onClick={() => history.push("/register")}>注册</Button>
            <Button onClick={() => history.push("/signIn")}>登录</Button>
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
          menuList?.map(item =>
            <Menu.Item key={item.id}>{item.label}</Menu.Item>
          )
        }
      </Menu>
    </div>
  )
}