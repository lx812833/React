import React, { useContext, useState } from "react";
import { MenuContext } from "./menu";
import { MenuItemProps } from './menuItem';
import { Icon } from "../Icon/icon";
import classNams from "classnames";
import { CSSTransition } from "react-transition-group";

export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string
}

export const SubMenu: React.FC<SubMenuProps> = (props) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>; // 断言submenus展开项为数组
  const { index, title, className, children } = props;
  const isOpend = (index && context.mode === "vertical") ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpend);
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
    const childrenComponent = React.Children.map(children, (child, i) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "menuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${i}`
        });
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return (
      <CSSTransition
        in={menuOpen}
        timeout={300}
        classNames="zoom-in-top"
        appear
      >
        <ul className={submenuClass}>
          {childrenComponent}
        </ul>
      </CSSTransition>
    )
  }

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className="submenu-title" {...clickEvents}>
        {title}
        <Icon className="arrow-icon" icon="icon-zhankai" theme="dark" />
      </div>
      {rendurChildren()}
    </li>
  )
}

SubMenu.displayName = "subMenu";