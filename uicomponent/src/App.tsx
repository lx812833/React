import { Button, ButtonType, ButtonSize } from "./components/Button/button";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from './components/Menu/menuItem';
import { SubMenu } from "./components/Menu/subMenu";
import { ExpandingCards, ProgressSteps, RotatingNavigation } from "./example";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello</h1>
        <>
          <Button autoFocus onClick={() => console.log(123)} size={ButtonSize.Large}> large button </Button>
          <Button size={ButtonSize.Small}> small button </Button>
          <Button btnType={ButtonType.Primary}> primary button </Button>
          <Button btnType={ButtonType.Danger}> danger button </Button>
          <Button btnType={ButtonType.Link} href="https://google.com"> link button </Button>
          <Button disabled>disabled</Button>
          <Button btnType={ButtonType.Link} href="https://google.com" disabled> disabled link button </Button>
        </>

        <>
          <Menu defaultIndex={"1"} mode="vertical" defaultOpenSubMenus={['2']} onSelect={(index) => { console.log("点击的", index) }}>
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
      </header>

      {/* <ExpandingCards /> */}
      {/* <ProgressSteps /> */}
      <RotatingNavigation />
    </div>
  );
}

export default App;
