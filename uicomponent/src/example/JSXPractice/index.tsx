import React, { useState, useEffect } from "react";
import ReactDOM from 'react-dom';
import { setTimeout } from "timers";

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
  const [number, setNumber] = useState(0);

  useEffect(() => {
    console.log('监听number变化，此时的number是:  ' + number);
  }, [number])

  const handleToChild = (value: string) => {
    setFatherSay(value);

    // 高优先级更新
    ReactDOM.flushSync(() => {
      setNumber(1);
    })

    // 批量更新
    setNumber(2);

    // 滞后更新，批量更新则被打破
    setTimeout(() => {
      setNumber(3) 
    }, 0)
  }

  return (
    <div style={{ marginTop: "50px" }}>
      父组件：<span>{number}</span>
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