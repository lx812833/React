import { User } from 'screens/projectList/searchPanel';
import { Button, Dropdown, Menu, Table, TableProps } from 'antd';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { Score } from 'components/score';
import { useEditProject } from 'components/project';
import styled from '@emotion/styled';

export interface Project {
  id: number,
  name: string,
  personId: number,
  organization: string,
  created: number,
  pin: boolean
}

// TableProps: Ant Design 属性
interface ListProps extends TableProps<Project> {
  users: User[],
  refresh?: () => void,
  createProjectBtn: JSX.Element
}

export const List = ({ users, ...props }: ListProps) => {
  // 随机字符串
  const handleSetKey = () => {
    return Math.random().toString(36).slice(-8)
  }
  // 项目评分与否
  const { rateProject } = useEditProject()

  return <Table pagination={false} rowKey={handleSetKey} columns={[
    {
      title: <Score checked={true} disabled={true} />,
      render(value, project) {
        return <Score checked={project.pin} onCheckedChange={pin => {
          rateProject({ id: project.id, pin }).then(props.refresh)
        }} />
      }
    },
    {
      title: '名称',
      sorter: (a, b) => a?.name.localeCompare(b?.name),
      render(value, project) {
        return <Link to={String(project.id)}>{project.name}</Link>
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
    },
    {
      render(value, project) {
        const overlay = <Menu>
          <Menu.Item key="edit">
            {props.createProjectBtn}
          </Menu.Item>
        </Menu>
        return <Dropdown overlay={overlay}>
          <ButtonNoPadding type="link">...</ButtonNoPadding>
        </Dropdown>
      }
    }
  ]}
    {...props}
  />
}

const ButtonNoPadding = styled(Button)`
  padding: 0;
`