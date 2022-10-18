import { useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";
import { connect } from "react-redux";
import { ConfigProvider } from "antd";
import Router from "@/routers/index";
import i18n from "i18next";
import { getBrowserLang } from "@/utils/util";
import useTheme from "@/hooks/useTheme";
import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import AuthRouter from "@/routers/utils/authRouter";
import { setLanguage } from "@/redux/modules/global/action";

function App(props: any) {
  const { language, assemblySize, themeConfig, setLanguage } = props;
  const [i18nLocale, setI18nLocale] = useState(enUS);

  // 全局使用主题
  useTheme(themeConfig);

  const setAntdLanguage = () => {
    // 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
    if (language && language == "zh") return setI18nLocale(zhCN);
    if (language && language == "en") return setI18nLocale(enUS);
    if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
    if (getBrowserLang() == "en") return setI18nLocale(enUS);
  };

  useEffect(() => {
    i18n.changeLanguage(language || getBrowserLang()); // 全局使用国际化
    setLanguage(language || getBrowserLang());
    setAntdLanguage();
  }, [language]);

  return (
    <HashRouter>
      <ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
        <AuthRouter>
          <Router />
        </AuthRouter>
      </ConfigProvider>
    </HashRouter >
  )
}

const mapStateToProps = (state: any) => state.global;
const mapDispatchToProps = { setLanguage };
export default connect(mapStateToProps, mapDispatchToProps)(App);
