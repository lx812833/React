import { SearchPanel } from './searchPanel';
import { List } from './list';
import { useDebounce, useDocumentTitle } from 'utils/index';
import styled from '@emotion/styled';
import { Typography, Button } from 'antd';
import { useUsers } from 'components/user';
import { Row } from 'components/row';
import { useProjects, useProjectsSearchParams, useProjectModal } from 'components/project';

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false)
  const { data: users } = useUsers()
  const { openProjectModal } = useProjectModal()

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: tableList, retry } = useProjects(useDebounce(param, 500))

  return <Container>
    <Row between={true}>
      <h1>项目列表</h1>
      <ButtonNoPadding type="link" onClick={openProjectModal}>创建项目</ButtonNoPadding>
    </Row>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
    <List
      refresh={retry}
      users={users || []}
      loading={isLoading}
      dataSource={tableList || []}
      createProjectBtn={
        <ButtonNoPadding
          type="link"
          onClick={openProjectModal}>
          创建项目
        </ButtonNoPadding>
      }
    />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`
const ButtonNoPadding = styled(Button)`
  padding: 0;
`