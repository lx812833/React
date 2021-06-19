import { SearchPanel } from './searchPanel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils/index';
import styled from '@emotion/styled';
import { Button, Typography } from 'antd';
import { useUsers } from 'components/user';
import { Row } from 'components/row';
import { useProjects, useProjectsSearchParams } from 'components/project';

export const ProjectListScreen = (props: { setProjectModalOpen: (isOpen: boolean) => void }) => {
  useDocumentTitle("项目列表", false)
  const { data: users } = useUsers()

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: tableList, retry } = useProjects(useDebounce(param, 500))

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <Button onClick={() => props.setProjectModalOpen(true)}>创建项目</Button>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
    <List 
      refresh={retry} 
      users={users || []} 
      loading={isLoading} 
      dataSource={tableList || []}
      setProjectModalOpen={props.setProjectModalOpen}
    />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`