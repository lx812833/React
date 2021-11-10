import React from "react";
import "./icon.scss";

interface IconProps {
  icon: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  const { icon } = props;
  return (
    <svg className="icon" aria-hidden="true">
      <use xlinkHref={`#${icon}`}></use>
    </svg>
  )
}