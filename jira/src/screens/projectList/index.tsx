import { SearchPanel } from './searchPanel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils/index';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useUsers } from 'components/user';
import { useProjects, useProjectsSearchParams } from 'components/project';

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false)
  const { data: users } = useUsers()

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: tableList, retry } = useProjects(useDebounce(param, 500))

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
    <List refresh={retry} users={users || []} loading={isLoading} dataSource={tableList || []} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`