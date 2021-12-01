import React, { useState } from "react";

interface ChildProps {
  fatherSay: string;
  childSay: Function;
}

export const JSXPractice: React.FC = (props) => {
  const todoList = ["react", "vue", "dom"];
  const status = false;
  const TextComponent = () => (
    <div> hello , i am function component </div>
  )

  return (
    <>
      <div>123</div>
      {status ? <div>456</div> : TextComponent()}

      {
        todoList.map(item => <div key={item}>{item}</div>)
      }
    </>
  )
}

export const Parent: React.FC = (props) => {
  const [childSay, setchildSay] = useState("");
  const [fatherSay, setFatherSay] = useState("");
  const handleToChild = (value: string) => {
    setFatherSay(value);
  }

  return (
    <div style={{ marginTop: "50px" }}>
      父组件：
      <div>子组件对父组件说： {childSay}</div>
      <input type="text" onChange={e => handleToChild(e.target.value)} placeholder="父对子说：" />
      <Child fatherSay={fatherSay} childSay={setchildSay} />
    </div>
  )
}

export const Child: React.FC<ChildProps> = (props) => {
  const { fatherSay, childSay } = props;
  const handleToParent = (value: string) => {
    childSay(value);
  }

  return (
    <div style={{ marginTop: "50px" }}>
      子组件：
      <div>父组件对子组件说：{fatherSay}</div>
      <input type="text" onChange={e => handleToParent(e.target.value)} placeholder="子对父说：" />
    </div>
  )
}