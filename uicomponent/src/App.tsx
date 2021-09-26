import { Button, ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>hello</h1>
        <>
          <Button size={ButtonSize.Large}> large button </Button>
          <Button size={ButtonSize.Small}> small button </Button>
          <Button type={ButtonType.Primary}> primary button </Button>
          <Button type={ButtonType.Danger}> danger button </Button>
          <Button type={ButtonType.Link} href="https://google.com"> link button </Button>
          <Button disabled>disabled</Button>
          <Button type={ButtonType.Link} href="https://google.com" disabled> disabled link button </Button>
        </>
      </header>
    </div>
  );
}

export default App;
