import { useEffect, useMemo } from 'react';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { useUrlQueryParam } from 'utils/url';
import { cleanObject } from 'utils/index';
import { Project } from 'screens/projectList/list'

export const useProjects = (param?: Partial<Project>) => {
  const { handleRunPromise, ...result } = useAsync<Project[]>()
  const request = useHttp()

  useEffect(() => {
    handleRunPromise(request("projects", { data: cleanObject(param || {}) }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param])

  return result
}

// 项目列表搜索参数
export const useProjectsSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
  return [
    useMemo(
      () => ({ ...param, personId: Number(param.personId) || undefined }),
      [param]
    ),
    setParam
  ] as const
}

export const useEditProject = () => {
  const { handleRunPromise, ...asyncResult } = useAsync()
  const request = useHttp()

  const rateProject = (params: Partial<Project>) => {
    return handleRunPromise(request(`projects/${params.id}`, {
      data: params,
      method: 'PATCH'
    }))
  }
  return {
    rateProject,
    ...asyncResult
  }
}