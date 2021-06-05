import { User } from 'screens/projectList/searchPanel';

interface Project {
  id: string,
  name: string,
  personId: string,
  organization: string
}

interface ListProps {
  list: Project[],
  users: User[]
}

export const List = ({ users, list }: ListProps) => {
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    <tbody>
      {
        list.map(res => <tr key={res.id}>
          <td>{res.name}</td>
          <td>{users.find(user => user.id === res.personId)?.name || '未知'}</td>
        </tr>)
      }
    </tbody>
  </table>
}