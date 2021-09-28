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
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode
}

// 内置button标签：React.ButtonHTMLAttributes<HTMLElement>
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;
// a标签：React.AnchorHTMLAttributes<HTMLElement>
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

// Partial：设置类型皆为可选
// &：使用ts类型别名定义交叉类型
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

export const Button: React.FC<ButtonProps> = (props) => {
  // resetProps：button 与 a标签其他内置属性
  const { disabled, size, btnType, href, children, className, ...resetProps } = props;
  
  const classes = classNams("btn", className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    "disabled": (btnType === ButtonType.Link) && disabled,
  })
  if (btnType === ButtonType.Link && href) {
    return (
      <a className={classes} href={href} {...resetProps}>{children}</a>
    )
  } else {
    return (
      <button className={classes} disabled={disabled} {...resetProps}>{children}</button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}