import { ProjectListScreen } from 'screens/projectList/index';
import { useAuth } from 'context/authContext';
import { Button } from 'antd';
import styled from '@emotion/styled';

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <Button type="default" onClick={logout}>退出</Button>
        </HeaderRight>
      </Header>
      <Nav>Nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6 rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas: 
  "header header header"
  "nav main aside"
  "footer footer footer";
  height: 100vh;
  grid-gap: 10rem;
`

// grid-area：给模块命名
const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div`

`

const Main = styled.main`grid-area: main;`
const Nav = styled.nav`grid-area: nav;`
const Aside = styled.aside`grid-area: aside;`
const Footer = styled.footer`grid-area: footer;`