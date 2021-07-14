import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import { Layout, Typography, Input } from 'antd';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles['App-header']}>
        <Layout.Header className={styles['main-header']}>
          <img src={logo} alt="logo" className={styles['App-logo']} />
          <Typography.Title level={3} className={styles.title}>
            React 旅游网
          </Typography.Title>
          <Input.Search placeholder="请输入旅游目的地、主题或关键字" className={styles['search-input']} />
        </Layout.Header>
      </div>
    </div>
  );
}

export default App;
