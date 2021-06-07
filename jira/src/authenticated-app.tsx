import { ProjectListScreen } from 'screens/projectList/index';
import { useAuth } from 'context/authContext';

export const AuthenticatedApp = () => {
  const { logout } = useAuth()
  return <div>
    <button onClick={logout}>登出</button>
    <ProjectListScreen />
  </div>
}