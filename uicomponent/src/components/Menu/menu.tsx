import React, { createContext, useState } from "react";
import classNams from "classnames";
import { MenuItemProps } from "./menuItem";

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
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical"
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

  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
      // 使用React.Children.map遍历Menu组件下的子组件
      // 使用React.cloneElement将数组index值注入到Menu子组件MenuItem中
      const element = child as React.FunctionComponentElement<MenuItemProps>;
      const { displayName } = element.type;
      if (displayName === "menuItem" || displayName === "subMenu") {
        return React.cloneElement(element, {
          index
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
  }

  return (
    <ul className={classes} style={style}>
      <MenuContext.Provider value={passedContext}>
        {renderChildren()}
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: 0,
  mode: "horizontal"
}