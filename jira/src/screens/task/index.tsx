import { Button, Input } from 'antd';
import { useState, useCallback, useRef, useReducer } from 'react';
import { ChildEmit, ProgressBar, SonCommunication } from './emit';

export const TaskScreen = () => {
  const ref = useRef(null)
  const [title, setTitle] = useState("hello world")
  const handleChangeTitle = (data: string) => {
    setTitle(data)
  }

  const [info, setInfo] = useState("父组件改变info值")
  const handleChangeInfo = (data: string) => {
    setInfo(data)
  }

  const [count, setCount] = useState(0)
  const testCallBack = useCallback(() => {
    return count * 2
  }, [count])

  const [childSay, setChildSay] = useState("")
  const [fatherSay, setFatherSay] = useState("")

  // useReducer
  const [number, dispatchNumber] = useReducer((state: number, action: any) => {
    const { payload, name } = action
    switch (name) {
      case 'add':
        return state + 1
      case 'sub':
        return state - 1
      case 'reset':
        return payload
    }
    return state
  }, 0)

  return (
    <>
      当前值：{number}
      { /* 派发更新 */}
      <Button onClick={() => dispatchNumber({ name: 'add' })} >增加</Button>
      <Button onClick={() => dispatchNumber({ name: 'sub' })} >减少</Button>
      <Button onClick={() => dispatchNumber({ name: 'reset', payload: 666 })} >赋值</Button>

      {/* ref 标记当前dom节点 */}
      <input ref={ref} type="text" />
      <Button onClick={() => console.log("当前dom节点：", ref, ref.current)}>Ref</Button>

      <Button onClick={() => setCount(count + 1)}>父组件的count：{count}</Button>

      <div className="box father" >
        父组件
        <div> 子组件传递的信息：{childSay} </div>
        <Input placeholder="我对子组件说" onChange={(e) => setFatherSay(e.target.value)} />
        <SonCommunication fatherSay={fatherSay} sayFather={setChildSay} />
      </div>

      <ChildEmit
        title={title} changeTitle={handleChangeTitle}
        info={info} changeInfo={handleChangeInfo}
        testCallBack={testCallBack} />
      <ProgressBar />
    </>
  )
}