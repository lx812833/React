import React from "react";
import classNams from "classnames";

interface IconProps {
  icon: string;
  theme: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, theme, className } = props;
  const classes = classNams("icon", className, {
    [`icon-${theme}`]: theme
  })

  return (
    <svg className={classes} aria-hidden="true">
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}