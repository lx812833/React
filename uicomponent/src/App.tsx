import { Button, ButtonType, ButtonSize } from "./components/Button/button";

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
      </header>
    </div>
  );
}

export default App;
