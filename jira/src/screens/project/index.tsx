import { Navigate, Route, Routes } from 'react-router';
import { Link } from 'react-router-dom';
import { KanbanScreen } from 'screens/kanban';
import { TaskScreen } from 'screens/task';

export const ProjectScreen = () => {
  return <div>
    <h1>hello</h1>
    <Link to="kanban">看板</Link>
    <Link to="task">任务组</Link>
    <Routes>
      <Route path={"kanban"} element={
        <KanbanScreen title="标题测试" renderTitle={() => {
          return <p>
            这里是通过render函数渲染出来的。
          </p>
        }}>
          <div>这是传递的React.ReactNode</div>
        </KanbanScreen>}
      />
      <Route path={"task"} element={<TaskScreen />} />
      <Navigate to={window.location.pathname + "/kanban"} />
    </Routes>
  </div>
}