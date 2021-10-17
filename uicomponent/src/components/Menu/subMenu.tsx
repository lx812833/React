import React, { useContext } from "react";
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
  const context = useContext(MenuContext)
  const classes = classNams("menu-item submenu-item", className, {
    "is-active": context.index === index
  })
  const rendurChildren = () => {
    const childrenComponent = React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "menuItem") {
        return childElement;
      } else {
        console.error("Warning: Menu has a child which is not a MenuItem component")
      }
    })
    return (
      <ul className="submenu">
        {childrenComponent}
      </ul>
    )
  }

  return (
    <li key={index} className={classes}>
      <div className="submenu-title">{title}</div>
      {rendurChildren()}
    </li>
  )
}

SubMenu.displayName = "subMenu";