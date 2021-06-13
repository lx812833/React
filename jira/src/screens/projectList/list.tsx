import { User } from 'screens/projectList/searchPanel';
import { Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

export interface Project {
  id: string,
  name: string,
  personId: string,
  organization: string,
  created: number
}

// TableProps: Ant Design 属性
interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  // 随机字符串
  const handleSetKey = () => {
    return Math.random().toString(36).slice(-8)
  }

  return <Table pagination={false} rowKey={handleSetKey} columns={[
    {
      title: '名称',
      sorter: (a, b) => a?.name.localeCompare(b?.name),
      render(value, project) {
        return <Link to={'5'}>{project.name}</Link>
      }
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
  ]}
    {...props}
  />
}