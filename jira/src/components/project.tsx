import { useEffect, useMemo, useCallback } from 'react';
import { useHttp } from 'utils/http';
import { useAsync } from 'utils/useAsync';
import { useUrlQueryParam, useSetUrlSearchParam } from 'utils/url';
import { cleanObject } from 'utils/index';
import { Project } from 'screens/projectList/list'
import { useMutation, useQuery, useQueryClient } from 'react-query';

// export const useProjects = (param?: Partial<Project>) => {
//   const { handleRunPromise, ...result } = useAsync<Project[]>()
//   const request = useHttp()
//   const fetchProjects = useCallback(
//     () => request("projects", { data: cleanObject(param || {}) }), [param, request]
//   )

//   useEffect(() => {
//     handleRunPromise(fetchProjects(), { retry: fetchProjects })
//   }, [param, handleRunPromise, fetchProjects])

//   return result
// }

// 使用 react-query实现 useProjects
export const useProjects = (param?: Partial<Project>) => {
  const request = useHttp()

  // 当 param 发生变化时，重新触发useQuery
  return useQuery<Project[], Error>(['projects', param], () => request('projects', { data: param }))
}

// export const useEditProject = () => {
//   const { handleRunPromise, ...asyncResult } = useAsync()
//   const request = useHttp()

//   const rateProject = (params: Partial<Project>) => {
//     return handleRunPromise(request(`projects/${params.id}`, {
//       data: params,
//       method: 'PATCH'
//     }))
//   }
//   return {
//     rateProject,
//     ...asyncResult
//   }
// }

// 使用react-query useMutation 实现 useEditProject
export const useEditProject = () => {
  const request = useHttp()
  const queryClient = useQueryClient()
  const [searchParams] = useProjectsSearchParams()
  const queryKey = ['projects', searchParams]
  return useMutation((params: Partial<Project>) => request(`projects/${params.id}`, {
    data: params,
    method: 'PATCH'
  }), {
    // 成功时返回回调，执行 useProjects （key值需一致）
    onSuccess: () => queryClient.invalidateQueries(queryKey)
  })
}

export const useAddProject = () => {
  const request = useHttp()
  const queryClient = useQueryClient()
  return useMutation((params: Partial<Project>) => request(`projects`, {
    data: params,
    method: 'POST'
  }), {
    onSuccess: () => queryClient.invalidateQueries('projects')
  })
}

export const useDetailProject = (id?: number) => {
  const request = useHttp()
  return useQuery<Project>(
    ['project', { id }],
    () => request(`projects/${id}`),
    {
      enabled: !!id // 只有当id存在时才触发获取详情操作 (Boolean(id))
    }
  )
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
  const [{ createProject }, setCreateProject] = useUrlQueryParam(['createProject'])
  const [{ editProjectId }, setEditProjectId] = useUrlQueryParam(['editProjectId'])
  const setUrlParams = useSetUrlSearchParam()

  const openProjectModal = () => setCreateProject({ createProject: true })
  const closeProjectModal = () => setUrlParams({ createProject: "", editProjectId: "" })
  const { data: editngProject, isLoading } = useDetailProject(Number(editProjectId))
  const toEdit = (id: number) => setEditProjectId({ editProjectId: id })

  return {
    projectModalOpen: createProject === 'true' || Boolean(editProjectId),
    openProjectModal,
    closeProjectModal,
    toEdit,
    editngProject,
    isLoading
  }
}