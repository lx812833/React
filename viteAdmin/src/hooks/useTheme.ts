import { ThemeConfigProp } from "@/redux/interface";
import defaultTheme from "@/styles/theme/theme-default.less";
import darkTheme from "@/styles/theme/theme-dark.less";

/**
 * @description 全局主题设置
 * */

const useTheme = (themeConfig: ThemeConfigProp) => {
  const { isDark } = themeConfig;

  const initTheme = () => {
    // 切换暗黑模式
    let head = document.getElementsByTagName("head")[0];
    const getStyle = head.getElementsByTagName("style");
    if (getStyle.length > 0) {
      for (let i = 0, l = getStyle.length; i < l; i++) {
        if (getStyle[i]?.getAttribute("data-type") === "dark") {
          getStyle[i].remove();
        }
      }
    }
    let styleDom = document.createElement("style");
    styleDom.dataset.type = "dark";
    styleDom.innerHTML = isDark ? darkTheme : defaultTheme;
    head.appendChild(styleDom);
  }
  initTheme();
}

export default useTheme;