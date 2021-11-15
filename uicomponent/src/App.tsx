import { Button, ButtonType, ButtonSize } from "./components/Button/button";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from './components/Menu/menuItem';
import { SubMenu } from "./components/Menu/subMenu";
import { Icon } from "./components/Icon/icon";
import { ExpandingCards, ProgressSteps, RotatingNavigation, InputWidget } from "./example";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello</h1>
        <>
          <Button autoFocus onClick={() => console.log(123)} size={ButtonSize.Large}> large button </Button>
          <Button size={ButtonSize.Small}>
            <Icon icon="icon-pingtaiguanlixitong-xitongjiekou" theme="info" />
            small button
          </Button>
          <Button btnType={ButtonType.Primary}>
            <Icon icon="icon-lvhuaguanli-danweiguanli" theme="success" />
            primary button
          </Button>
          <Button btnType={ButtonType.Danger}>
            <Icon icon="icon-pingtaiguanlixitong-daimashengcheng" theme="primary" />
            danger button
          </Button>
          <Button btnType={ButtonType.Link} href="https://google.com"> link button </Button>
          <Button disabled>
            <Icon icon="icon-lvhuaguanli-zhifaguanli" theme="success" />
            disabled
          </Button>
          <Button btnType={ButtonType.Link} href="https://google.com" disabled> disabled link button </Button>
        </>

        <>
          <Menu defaultIndex={"1"} mode="horizontal" defaultOpenSubMenus={['2']} onSelect={(index) => { console.log("点击的", index) }}>
            <MenuItem>menu 1</MenuItem>
            <MenuItem disabled>menu 2</MenuItem>
            <SubMenu title="dropdown">
              <MenuItem>dropdown-1</MenuItem>
              <MenuItem>dropdown-2</MenuItem>
              <MenuItem>dropdown-3</MenuItem>
            </SubMenu>
            <MenuItem>menu 4</MenuItem>
          </Menu>
        </>

        <>
          <Icon icon="icon-zuzhi-copy" theme="dark" />
        </>
      </header>

      <ExpandingCards />
      <ProgressSteps />
      <RotatingNavigation />
      <InputWidget />
    </div>
  );
}

export default App;
