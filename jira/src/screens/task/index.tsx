import { useState } from 'react';
import { ChildEmit, ProgressBar } from './emit';

export const TaskScreen = () => {
  const [title, setTitle] = useState("hello world")
  const handleChangeTitle = (data: string) => {
    setTitle(data)
  }
  return (
    <div>
      <div>任务组</div>
      <ChildEmit title={title} changeTitle={handleChangeTitle} />
      <ProgressBar />
    </div>
  )
}