import React, { createContext, useState } from "react";
import classNams from "classnames";

type MenuMode = "horizontal" | "vertical";
type SelectedCallback = (selectedIndex: number) => void;

export interface MenuProps {
  defaultIndex?: number;
  className?: string;
  mode?: MenuMode;
  style?: React.CSSProperties;
  onSelect?: SelectedCallback;
}

interface IMenuContext {
  index: number;
  onSelect?: SelectedCallback;
}

export const MenuContext = createContext<IMenuContext>({
  index: 0
})

export const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, children, defaultIndex, onSelect } = props;
  const [curActive, setCurActive] = useState(defaultIndex);
  const classes = classNams("menu", className, {
    "menu-vertical": mode === "vertical"
  })
  const handleClick = (index: number) => {
    setCurActive(index);
    if (onSelect) {
      onSelect(index);
    }
  }
  const passedContext: IMenuContext = {
    index: curActive ? curActive : 0,
    onSelect: handleClick,
  }
  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {children}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "vertical"
}