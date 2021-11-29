import React from "react";

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