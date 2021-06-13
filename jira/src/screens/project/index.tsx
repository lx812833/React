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
      <Route path={"kanban"} element={<KanbanScreen />} />
      <Route path={"task"} element={<TaskScreen />} />
      <Navigate to={window.location.pathname + "/kanban"} />
    </Routes>
  </div>
}