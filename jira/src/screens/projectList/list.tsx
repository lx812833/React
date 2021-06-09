import { User } from 'screens/projectList/searchPanel';
import { Table } from 'antd';

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
  // 随机字符串
  const handleSetKey = () => {
    return Math.random().toString(36).slice(-8)
  }

  return <Table pagination={false} rowKey={handleSetKey} columns={[{
    title: '名称',
    dataIndex: 'name',
    sorter: (a, b) => a?.name.localeCompare(b?.name)
  }, {
    title: '负责人',
    render(value, project) {
      return <span>
        {users.find((user: User) => user.id === project.personId)?.name || '未知'}
      </span>
    }
  }]} dataSource={list} />
}