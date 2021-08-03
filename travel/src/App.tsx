import { HomePage, SignInPage, RegisterPage, DetailPage } from "./views/index";
import styles from "./App.module.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className={styles.App}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/detail/:touristRouteId" component={DetailPage} />
          <Route render={() => (<h1>404 not found</h1>)} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
