import React, { useContext, useState } from "react";
import classNams from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menuItem';

export interface SubMenuProps {
  index?: number;
  title: string;
  className?: string
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const { index, title, className, children } = props;
  const [menuOpen, setMenuOpen] = useState(false);
  const context = useContext(MenuContext);
  const classes = classNams("menu-item submenu-item", className, {
    "is-active": context.index === index
  })
  // 点击触发
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  }
  // hover触发
  let timer: any;
  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    clearInterval(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  }
  // 根据mode绑定不同函数
  const clickEvents = context.mode === "vertical" ? {
    onClick: handleClick
  } : {};
  const hoverEvents = context.mode !== "vertical" ? {
    onMouseEnter: (e: React.MouseEvent) => { handleMouse(e, true) },
    onMouseLeave: (e: React.MouseEvent) => { handleMouse(e, false) }
  } : {}

  const rendurChildren = () => {
    const submenuClass = classNams("submenu", {
      "menu-opened": menuOpen
    })
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "menuItem") {
        return childElement;
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className={submenuClass}>
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>{title}</div>
      {rendurChildren()}
    </li>
  )
}

SubMenu.displayName = "subMenu";