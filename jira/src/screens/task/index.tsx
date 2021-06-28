import { Button } from 'antd';
import { useState, useCallback, useRef, useReducer } from 'react';
import { ChildEmit, ProgressBar } from './emit';

export const TaskScreen = () => {
  const ref = useRef(null)
  const [title, setTitle] = useState("hello world")
  const [count, setCount] = useState(0)
  const handleChangeTitle = (data: string) => {
    setTitle(data)
  }

  const testCallBack = useCallback(() => {
    return count * 2
  }, [count])

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
    <div ref={ref}>
      {/* ref 标记当前dom节点 */}

      当前值：{number}
      { /* 派发更新 */}
      <Button onClick={() => dispatchNumber({ name: 'add' })} >增加</Button>
      <Button onClick={() => dispatchNumber({ name: 'sub' })} >减少</Button>
      <Button onClick={() => dispatchNumber({ name: 'reset', payload: 666 })} >赋值</Button>

      <div onClick={() => console.log("当前dom节点：", ref)}>任务组</div>
      <Button onClick={() => setCount(count + 1)}>父组件的count：{count}</Button>
      <ChildEmit title={title} changeTitle={handleChangeTitle} testCallBack={testCallBack} />
      <ProgressBar />
    </div>
  )
}