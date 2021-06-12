import { ProjectListScreen } from 'screens/projectList/index';
import { useAuth } from 'context/authContext';
import { Dropdown, Menu } from 'antd';
import styled from '@emotion/styled';
import { Row } from './components/row';
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg';

export const AuthenticatedApp = () => {
  const { logout, user } = useAuth()
  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          {/* 使用 ReactComponent as SoftwareLogo 来组件渲染svg */}
          {/* <img src={softwareLogo} alt="" /> */}
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          <Dropdown overlay={
            <Menu>
              <Menu.Item>
                <a onClick={logout}>登出</a>
              </Menu.Item>
            </Menu>
          }>
            <a onClick={e => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
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