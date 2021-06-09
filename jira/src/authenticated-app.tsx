import { ProjectListScreen } from 'screens/projectList/index';
import { useAuth } from 'context/authContext';
import { Button } from 'antd';

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return <div>
    <Button type="default" onClick={logout}>退出</Button>
    <ProjectListScreen />
  </div>
}