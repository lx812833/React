import React from 'react';
import { Hello } from './Hello';
import './App.css';

interface IThemeProps {
  [key: string]: {
    color: string;
    background: string;
  }
}

const themes: IThemeProps = {
  "light": {
    color: "#000",
    background: "#eee"
  },
  "dark": {
    color: "#fff",
    background: "#222"
  }
}

export const themeContext = React.createContext(themes.dark);

function App() {
  return (
    <themeContext.Provider value={themes.dark}>
      <div className="App">
        <header className="App-header">
          <Hello />
        </header>
      </div>
    </themeContext.Provider>
  );
}

export default App;
