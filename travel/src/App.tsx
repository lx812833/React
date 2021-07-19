import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Layout, Typography, Input, Dropdown, Menu, Button } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';

function App() {
  const menuList = [
    { id: 1, label: "旅游首页" },
    { id: 2, label: "周末游" },
    { id: 3, label: "跟团游" },
    { id: 4, label: "自由行" },
    { id: 5, label: "私家团" },
    { id: 6, label: "邮轮" },
    { id: 7, label: "酒店+景点" },
    { id: 8, label: "当地玩乐" },
    { id: 9, label: "主题游" },
    { id: 10, label: "定制游" },
    { id: 11, label: "游学" },
    { id: 12, label: "签证" },
    { id: 13, label: "企业游" },
    { id: 14, label: "高端游" },
    { id: 15, label: "爱玩户外" },
    { id: 16, label: "保险" }
  ]
  return (
    <div className={styles.App}>
      <div className={styles['App-header']}>
        <div className={styles['top-header']}>
          <div className={styles.inner}>
            <Typography.Text>让旅游更幸福</Typography.Text>
            <Dropdown.Button style={{ marginLeft: 15 }} overlay={
              <Menu>
                <Menu.Item key="cn">中文</Menu.Item>
                <Menu.Item key="en">英文</Menu.Item>
              </Menu>
            }
              icon={<GlobalOutlined />}
            >
              语言
            </Dropdown.Button>
            <Button.Group className={styles['button-group']}>
              <Button>注册</Button>
              <Button>登录</Button>
            </Button.Group>
          </div>
        </div>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            React 旅游网
          </Typography.Title>
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
      <Layout.Footer>
        <Typography.Title level={3} style={{ textAlign: 'center' }}>哎，就是玩儿</Typography.Title>
      </Layout.Footer>
    </div>
  );
}

export default App;
