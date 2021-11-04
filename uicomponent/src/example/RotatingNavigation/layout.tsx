import React, { useState } from "react";

interface IMenuProps {
  changeIcon: (val: string) => void;
}

interface INavListProps {
  navList: { [key: string]: string }[];
}

export const LeftMenu: React.FC<IMenuProps> = (props) => {
  const { changeIcon } = props;
  const [status, setStatus] = useState("close");
  const onChangeHandler = (icon: string) => {
    const changeValue = icon === "close" ? "open" : "close";
    setStatus(changeValue);
    changeIcon(changeValue);
  }

  return (
    <div className="circle-container">
      <div className="circle">
        {
          <i
            className={`${status}`}
            onClick={() => onChangeHandler(status)}>
          </i>
        }
      </div>
    </div>
  )
}

export const Content: React.FC = (props) => {
  const { children } = props;

  return (
    <div className="page-content">
      {children}
    </div>
  )
}

export const NavList: React.FC<INavListProps> = (props) => {
  const { navList } = props;

  return (
    <nav className="navList">
      <ul>
        {
          navList?.map((item, index) => (
            <li key={item.text + index}>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.text}</a>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}
