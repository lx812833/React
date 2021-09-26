import React from "react";
import classNams from "classnames";

export enum ButtonSize {
  Large = "lg",
  Small = "sm"
}

export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link"
}

interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  type?: ButtonType;
  href?: string;
  children: React.ReactNode
}

export const Button: React.FC<BaseButtonProps> = (props) => {
  const { disabled, size, type, href, children } = props;
  const classes = classNams("btn", {
    [`btn-${type}`]: type,
    [`btn-${size}`]: size,
    "disabled": (type === ButtonType.Link) && disabled,
  })
  if (type === ButtonType.Link && href) {
    return (
      <a className={classes} href={href}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  type: ButtonType.Default
}