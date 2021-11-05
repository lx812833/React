import React from "react";
import "./input.scss";

interface IInputProps {
  className: string;
  placeholder?: string;
  nativeType?: string;
  children: React.ReactElement;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const Input: React.FC<IInputProps> = (props) => {
  const { className, placeholder = "请输入", nativeType = "text", children, inputRef } = props;

  return (
    <div className={`${className} input-container`}>
      <input type={nativeType} placeholder={placeholder} ref={inputRef} />
      {children}
    </div>
  )
}