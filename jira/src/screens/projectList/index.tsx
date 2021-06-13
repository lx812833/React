import { useState, useEffect } from 'react';
import { SearchPanel } from './searchPanel';
import { List, Project } from './list';
import { cleanObject, useMount, useDebounce } from 'utils/index';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import styled from '@emotion/styled';
import { Typography } from 'antd';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 500)
  const request = useHttp()
  // const [list, setList] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  const { handleRunPromise, isLoading, error, data: tableList } = useAsync<Project[]>()

  useEffect(() => {
    /**
     * 分开写
     */
    // setIsLoading(true)
    // request('projects', { data: cleanObject(debouncedParam) })
    //   .then(res => setList(res))
    //   .catch(error => {
    //     setList([])
    //     setError(error)
    //   })
    //   // finally：promise回调，无论reject还是resolve都会执行
    //   .finally(() => setIsLoading(false))

    /**
     * 逻辑合并
     */
    handleRunPromise(request('projects', { data: cleanObject(debouncedParam) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    request('users', {}).then(res => setUsers(res))
  })

  return <Container>
    <h1>项目列表</h1>
    <SearchPanel users={users} param={param} setParam={setParam} />
    {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
    <List users={users} loading={isLoading} dataSource={tableList || []} />
  </Container>
}

const Container = styled.div`
  padding: 3.2rem;
`