import React, { useMemo, useState, Suspense } from "react";

interface IChildrenProps {
  number: number;
  tag: string
}

const Children = (props: IChildrenProps) => {
  const { number, tag } = props;
  console.log(`组件${tag}渲染`, number);
  return <div>组件{tag}：{number}</div>
}

export const Memo: React.FC = () => {
  const [numberA, setNumberA] = useState(0);
  const [numberB, setNumberB] = useState(0);

  return (
    <>
      {/* <Children number={numberA} tag="A" /> */}
      {useMemo(() => <Children number={numberB} tag="B" />, [numberB])}
      <button onClick={() => setNumberA(numberA => numberA + 1)}>{numberA}</button>
      <button onClick={() => setNumberB(numberB => numberB + 1)}>{numberB}</button>
    </>
  )
}

const AsyncComponent = () => {
  let test = "";
  setTimeout(() => {
    test = "123";
  }, 51000);
  return (
    <>
      <div style={{ marginTop: "50px" }}>{test}</div>
      <div>Suspense</div>
    </>
  )
}

export const SuspenseTest: React.FC = () => {
  const loadInfo = <h1>Loading...</h1>
  return (
    <Suspense fallback={loadInfo}>
      <AsyncComponent />
    </Suspense>
  )
}