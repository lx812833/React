import React, { useContext, useState } from "react";

interface IThemeProps {
  [key: string]: {
    color: string;
    background: string;
  }
}

interface ILanguageProps {
  language: "zh" | "en";
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

const languages: ILanguageProps = {
  language: "zh"
}

const themeContext = React.createContext(themes.dark);
const languageContext = React.createContext(languages);

// 嵌套 Provider
export const AppContext: React.FC = (props) => {
  const [theme, setTheme] = useState(themes.dark);
  const [language, setlanguage] = useState(languages);
  const changeTheme = () => {
    if (theme.color === "#fff") {
      setTheme(themes.light);
    } else {
      setTheme(themes.dark);
    }
  }
  const changeLanguage = () => {
    if (language.language === "zh") {
      setlanguage({ language: "en" });
    } else {
      setlanguage({ language: "zh" });
    }
  }

  return (
    <>
      <button onClick={changeTheme}>主题</button>
      <button onClick={changeLanguage}>语言</button>

      <themeContext.Provider value={theme}>
        <languageContext.Provider value={language}>
          <UsedContext />
        </languageContext.Provider>
      </themeContext.Provider>
    </>
  )
}

const UsedContext: React.FC = (props) => {
  const theme = useContext(themeContext);
  const language = useContext(languageContext);
  return (
    <div style={{ marginTop: '50px', color: theme.color, background: theme.background }}>
      {language.language === "zh" ? "中文" : "English"}
    </div>
  )
}