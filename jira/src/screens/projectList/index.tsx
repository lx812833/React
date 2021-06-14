import { useEffect } from 'react';
import { SearchPanel } from './searchPanel';
import { List, Project } from './list';
import { cleanObject, useDebounce, useDocumentTitle } from 'utils/index';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import styled from '@emotion/styled';
import { Typography } from 'antd';
import { useUrlQueryParam } from 'utils/url';
import { useUsers } from 'components/userSelect';

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false)
  const { data: users } = useUsers()
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  const debouncedParam = useDebounce(param, 500)
  const request = useHttp()
  const { handleRunPromise, isLoading, error, data: tableList } = useAsync<Project[]>()

  useEffect(() => {
    handleRunPromise(request('projects', { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users || []} param={param} setParam={setParam} />
    {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
    <List users={users || []} loading={isLoading} dataSource={tableList || []} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`