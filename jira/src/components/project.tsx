import { useEffect, useMemo, useCallback } from 'react';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { useUrlQueryParam } from 'utils/url';
import { cleanObject } from 'utils/index';
import { Project } from 'screens/projectList/list'

export const useProjects = (param?: Partial<Project>) => {
  const { handleRunPromise, ...result } = useAsync<Project[]>()
  const request = useHttp()
  const fetchProjects = useCallback(
    () => request("projects", { data: cleanObject(param || {}) }), [param, request]
  )

  useEffect(() => {
    handleRunPromise(fetchProjects(), { retry: fetchProjects })
  }, [param, handleRunPromise, fetchProjects])

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

// 通过url管理modal状态
export const useProjectModal = () => {
  const [{ projectCreate }, setProjectCreate] = useUrlQueryParam(['projectCreate'])

  const openProjectModal = () => setProjectCreate({ projectCreate: true })
  const closeProjectModal = () => setProjectCreate({ projectCreate: null })

  return {
    projectModalOpen: projectCreate === 'true',
    openProjectModal,
    closeProjectModal
  }
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