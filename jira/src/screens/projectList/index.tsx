import { useState, useEffect } from 'react';
import { SearchPanel } from './searchPanel';
import { List } from './list';
import { cleanObject, useMount, useDebounce } from 'utils/index';
import { useHttp } from 'utils/http';

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param, 500)
  const [list, setList] = useState([])
  const request = useHttp()

  useEffect(() => {
    request('projects', { data: cleanObject(debouncedParam) }).then(res => setList(res))
  }, [debouncedParam])

  useMount(() => {
    request('users', {}).then(res => setUsers(res))
  })

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}