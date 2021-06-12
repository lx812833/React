import { User } from 'screens/projectList/searchPanel';
import { Table } from 'antd';
import dayjs from 'dayjs';

interface Project {
  id: string,
  name: string,
  personId: string,
  organization: string,
  created: number
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

  return <Table pagination={false} rowKey={handleSetKey} columns={[
    {
      title: '名称',
      dataIndex: 'name',
      sorter: (a, b) => a?.name.localeCompare(b?.name)
    },
    {
      title: '部门',
      dataIndex: 'organization'
    },
    {
      title: '负责人',
      render(value, project) {
        return <span>
          {users.find((user: User) => user.id === project.personId)?.name || '未知'}
        </span>
      }
    },
    {
      title: '创建时间',
      render(value, project) {
        return <span>
          {project.created ? dayjs(project.created).format('YYYY-MM-DD') : '无'}
        </span>
      }
    }
  ]} dataSource={list} />
}