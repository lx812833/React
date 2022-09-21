
import { ThemeConfigProp } from "@/redux/interface";

/**
 * @description 全局主题设置
 * */

const useTheme = (themeConfig: ThemeConfigProp) => {
  const { isDark } = themeConfig;

  console.log("全局主题", isDark);
  return 1
}

export default useTheme;