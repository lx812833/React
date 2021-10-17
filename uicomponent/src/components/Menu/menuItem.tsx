import React, { useContext } from "react";
import classNams from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: number;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const MenuItem: React.FC<MenuItemProps> = (props) => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNams("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index
  })
  const handleItemClick = () => {
    if (context.onSelect && !disabled && (typeof index === "number")) {
      context.onSelect(index);
    }
  }

  return (
    <li className={classes} style={style} onClick={handleItemClick}>
      {children}
    </li>
  )
}

// 限制Menu组件的children只能为MenuItem，加以 displayName 区分。
MenuItem.displayName = "menuItem";