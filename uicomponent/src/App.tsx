import { Button, ButtonType, ButtonSize } from "./components/Button/button";
import { Menu } from "./components/Menu/menu";
import { MenuItem } from './components/Menu/menuItem';

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
          <Menu defaultIndex={1} onSelect={index => alert(index)}>
            <MenuItem index={1}>1</MenuItem>
            <MenuItem index={2} disabled>2</MenuItem>
            <MenuItem index={3}>3</MenuItem>
            <MenuItem index={4}>4</MenuItem>
          </Menu>
        </>
      </header>
    </div>
  );
}

export default App;
