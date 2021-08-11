export interface LanguageState {
  language: "zh" | "en";
  languageList: {
    name: string;
    code: string;
  }[];
}

interface ActionState {
  type: string;
  payload: string;
}

const defaultState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" }
  ]
}

export default (state = defaultState, action: ActionState | any) => {
  switch (action.type) {
    case "change_language":
      // state中数据不可更改
      return { ...state, language: action.payload };
    default:
      return state;
  }
}