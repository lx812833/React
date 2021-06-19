import React, { useState } from 'react';
import { ProjectListScreen } from 'screens/projectList/index';
import { ProjectScreen } from 'screens/project/index';
import { ProjectModal } from 'screens/projectList/projectModal';
import { ProjectPopover } from 'components/projectPopover';
import { useAuth } from 'context/authContext';
import { Dropdown, Menu, Button } from 'antd';
import styled from '@emotion/styled';
import { Row } from './components/row';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';
import { Navigate, Route, Routes } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';
import { resetRouter } from 'utils/index';

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)

  return (
    <Container>
      <PageHeader createProjectBtn={
        <ButtonNoPadding type="link" onClick={() => setProjectModalOpen(true)}>创建项目</ButtonNoPadding>
      } />
      <Main>
        <Router>
          <Routes>
            <Route path={"/projects"} element={<ProjectListScreen createProjectBtn={
              <ButtonNoPadding type="link" onClick={() => setProjectModalOpen(true)}>创建项目</ButtonNoPadding>
            } />} />
            <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
            <Navigate to={"/projects"} />
          </Routes>
        </Router>
      </Main>
      <ProjectModal projectModalOpen={projectModalOpen} onClose={() => setProjectModalOpen(false)} />
    </Container>
  )
}

const PageHeader = (props: { createProjectBtn: JSX.Element }) => {
  const { logout, user } = useAuth()
  return <Header between={true}>
    <HeaderLeft gap={true}>
      {/* 使用 ReactComponent as SoftwareLogo 来组件渲染svg */}
      {/* <img src={softwareLogo} alt="" /> */}
      <Button style={{ padding: 0 }} type="link" onClick={resetRouter}>
        <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
      </Button>
      <ProjectPopover {...props} />
      <span>用户</span>
    </HeaderLeft>
    <HeaderRight>
      <Dropdown overlay={
        <Menu>
          <Menu.Item key="logout">
            <Button type="link" onClick={logout}>登出</Button>
          </Menu.Item>
        </Menu>
      }>
        <Button type="link" onClick={e => e.preventDefault()}>Hi, {user?.name}</Button>
      </Dropdown>
    </HeaderRight>
  </Header>
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`

// grid-area：给模块命名
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;

const Main = styled.main``;

const ButtonNoPadding = styled(Button)`
  padding: 0;
`