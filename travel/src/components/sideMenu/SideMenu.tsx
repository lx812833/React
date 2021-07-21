import { Menu } from "antd";
import { GifOutlined } from "@ant-design/icons";
import { sideMenuList } from './mockup';
import styles from "./SideMenu.module.css";

export const SideMenu = () => {
  return (
    <Menu mode="vertical" className={styles["side-menu"]}>
      {sideMenuList?.map((m, index) => (
        <Menu.SubMenu key={`side-menu-${index}`}
          title={
            <span><GifOutlined />{m.title}</span>
          }>
          {m.subMenu?.map((sm, smindex) => (
            <Menu.SubMenu key={`sub-menu-${index}-${smindex}`}
              title={
                <span><GifOutlined />{sm.title}</span>
              }>
              {sm.subMenu.map((sms, smsindex) => (
                <Menu.Item key={`sub-sub-menu-${index}-${smindex}-${smsindex}`}>
                  <span><GifOutlined />{sms}</span>
                </Menu.Item>
              ))}
            </Menu.SubMenu>
          ))}
        </Menu.SubMenu>
      ))}
    </Menu>
  )
}