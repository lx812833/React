interface LanguageState {
  language: "zh" | "en";
  languageList: {
    name: string;
    code: string;
  }[];
}

const defauleState: LanguageState = {
  language: "zh",
  languageList: [
    { name: "中文", code: "zh" },
    { name: "English", code: "en" }
  ]
}

export default (state = defauleState, action: any) => {
  if(action.type === "change_language") {
    const newState = {...state, language: action.payload};
    return newState;
  }
  return state;
}