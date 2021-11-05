import React, { useState, useRef } from "react";
import { Input } from "./input";
import "./index.scss";

export const InputWidget: React.FC = (props) => {
  const inputRef = useRef<HTMLInputElement>(null); // 在ts中需要定义ref的属性类型
  const [currentActive, setCurrentActive] = useState("");

  const changeActive = () => {
    let active = !currentActive ? " active" : "";
    setCurrentActive(active);
    if (inputRef.current && active.trim().indexOf("active") > -1) {
      inputRef.current.focus();
    }
  }

  return (
    <div className="search-wrapper">
      <Input className={"search-container" + currentActive} placeholder="请输入搜索内容" nativeType="text" inputRef={inputRef}>
        <button type="button" className="search-btn" onClick={changeActive}>
          <i className="search-icon"></i>
        </button>
      </Input>
    </div>
  )
}